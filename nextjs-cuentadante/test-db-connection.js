import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cuentadante',
  password: 'chi123cha456',
  port: 5432,
})

async function testConnection() {
  console.log('🔍 Probando conexión a PostgreSQL...\n')
  
  try {
    // Test 1: Conexión básica
    console.log('1️⃣ Probando conexión básica...')
    const client = await pool.connect()
    console.log('   ✅ Conexión exitosa a PostgreSQL\n')
    
    // Test 2: Verificar base de datos
    console.log('2️⃣ Verificando base de datos "cuentadante"...')
    const dbResult = await client.query('SELECT current_database()')
    console.log(`   ✅ Base de datos actual: ${dbResult.rows[0].current_database}\n`)
    
    // Test 3: Listar tablas
    console.log('3️⃣ Listando tablas en la base de datos...')
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `)
    
    if (tablesResult.rows.length > 0) {
      console.log('   ✅ Tablas encontradas:')
      tablesResult.rows.forEach(row => {
        console.log(`      - ${row.table_name}`)
      })
      console.log('')
    } else {
      console.log('   ⚠️  No se encontraron tablas\n')
    }
    
    // Test 4: Verificar tabla users
    console.log('4️⃣ Verificando tabla "users"...')
    const usersResult = await client.query('SELECT COUNT(*) as count FROM users')
    console.log(`   ✅ Usuarios en la base de datos: ${usersResult.rows[0].count}\n`)
    
    // Test 5: Verificar tabla assets
    console.log('5️⃣ Verificando tabla "assets"...')
    const assetsResult = await client.query('SELECT COUNT(*) as count FROM assets')
    console.log(`   ✅ Bienes en la base de datos: ${assetsResult.rows[0].count}\n`)
    
    // Test 6: Verificar tabla requests
    console.log('6️⃣ Verificando tabla "requests"...')
    const requestsResult = await client.query('SELECT COUNT(*) as count FROM requests')
    console.log(`   ✅ Solicitudes en la base de datos: ${requestsResult.rows[0].count}\n`)
    
    // Test 7: Verificar usuario cuentadante
    console.log('7️⃣ Verificando usuario cuentadante...')
    const userResult = await client.query(`
      SELECT id, name, email, role 
      FROM users 
      WHERE email = 'cuentadante@sistema.edu.co'
    `)
    
    if (userResult.rows.length > 0) {
      const user = userResult.rows[0]
      console.log('   ✅ Usuario encontrado:')
      console.log(`      - ID: ${user.id}`)
      console.log(`      - Nombre: ${user.name}`)
      console.log(`      - Email: ${user.email}`)
      console.log(`      - Rol: ${user.role}\n`)
    } else {
      console.log('   ⚠️  Usuario cuentadante no encontrado\n')
    }
    
    client.release()
    
    console.log('✅ TODAS LAS PRUEBAS PASARON EXITOSAMENTE')
    console.log('\n🚀 El servidor Next.js puede conectarse a la base de datos')
    console.log('🌐 Abre http://localhost:3001 en tu navegador\n')
    
  } catch (error) {
    console.error('❌ ERROR DE CONEXIÓN:', error.message)
    console.error('\n🔧 Verifica que:')
    console.error('   1. PostgreSQL esté corriendo')
    console.error('   2. La base de datos "cuentadante" exista')
    console.error('   3. Las credenciales sean correctas')
    console.error('   4. El puerto 5432 esté disponible\n')
  } finally {
    await pool.end()
  }
}

testConnection()
