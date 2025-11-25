import { query } from './db.js';

async function testLogin() {
  const email = 'cuentadante@sistema.edu.co';
  const password = 'cuentadante_1';

  console.log('🔍 PRUEBA DE LOGIN');
  console.log('==================');
  console.log(`📧 Email: ${email}`);
  console.log(`🔒 Password: ${password}\n`);

  try {
    // Buscar usuario
    console.log('1️⃣ Buscando usuario en la base de datos...');
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      console.log('❌ Usuario no encontrado');
      return;
    }

    console.log('✅ Usuario encontrado:');
    const user = result.rows[0];
    console.log(`   ID: ${user.id}`);
    console.log(`   Nombre: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Password en DB: ${user.password}\n`);

    // Verificar contraseña
    console.log('2️⃣ Verificando contraseña...');
    if (user.password !== password) {
      console.log(`❌ Contraseña incorrecta`);
      console.log(`   Esperada: ${password}`);
      console.log(`   En DB: ${user.password}`);
      return;
    }
    console.log('✅ Contraseña correcta\n');

    // Verificar rol
    console.log('3️⃣ Verificando rol...');
    if (user.role !== 'Cuentadante') {
      console.log(`❌ Rol incorrecto: ${user.role}`);
      return;
    }
    console.log('✅ Rol correcto: Cuentadante\n');

    console.log('🎉 LOGIN EXITOSO');
    console.log('================');
    console.log('El usuario puede iniciar sesión correctamente');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }

  process.exit(0);
}

testLogin();
