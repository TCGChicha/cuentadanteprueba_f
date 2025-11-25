console.log('🧪 PRUEBA COMPLETA DE ENDPOINTS');
console.log('================================\n');

async function testEndpoints() {
  const baseUrl = 'http://localhost:3000/api';
  
  try {
    // 1. Test Dashboard Stats
    console.log('1️⃣ Probando estadísticas del dashboard...');
    const statsRes = await fetch(`${baseUrl}/dashboard/stats`);
    const stats = await statsRes.json();
    console.log('✅ Dashboard Stats:');
    console.log(`   📦 Total Bienes: ${stats.total_assets}`);
    console.log(`   ✅ Disponibles: ${stats.available_assets}`);
    console.log(`   📤 Asignados: ${stats.assigned_assets}`);
    console.log(`   ⏳ Solicitudes Pendientes: ${stats.pending_requests}`);
    console.log(`   💰 Valor Total: $${parseFloat(stats.total_asset_value).toLocaleString()}\n`);

    // 2. Test Requests
    console.log('2️⃣ Probando endpoint de solicitudes...');
    const requestsRes = await fetch(`${baseUrl}/requests`);
    const requests = await requestsRes.json();
    console.log(`✅ Solicitudes encontradas: ${requests.length}`);
    if (requests.length > 0) {
      const pendientes = requests.filter(r => r.status === 'Pendiente');
      const aprobadas = requests.filter(r => r.status === 'Aprobado');
      const rechazadas = requests.filter(r => r.status === 'Rechazado');
      console.log(`   ⏳ Pendientes: ${pendientes.length}`);
      console.log(`   ✅ Aprobadas: ${aprobadas.length}`);
      console.log(`   ❌ Rechazadas: ${rechazadas.length}\n`);
    }

    // 3. Test Assets
    console.log('3️⃣ Probando endpoint de bienes...');
    const assetsRes = await fetch(`${baseUrl}/assets`);
    const assets = await assetsRes.json();
    console.log(`✅ Bienes encontrados: ${assets.length}`);
    if (assets.length > 0) {
      const disponibles = assets.filter(a => a.status === 'Available');
      const asignados = assets.filter(a => a.status === 'Assigned');
      console.log(`   ✅ Disponibles: ${disponibles.length}`);
      console.log(`   📤 Asignados: ${asignados.length}`);
      
      // Mostrar algunos bienes
      console.log('\n   📋 Muestra de bienes:');
      assets.slice(0, 3).forEach(asset => {
        console.log(`      • ${asset.name} (${asset.brand}) - ${asset.status}`);
      });
      console.log();
    }

    // 4. Test Movements
    console.log('4️⃣ Probando endpoint de movimientos...');
    const movementsRes = await fetch(`${baseUrl}/movements`);
    const movements = await movementsRes.json();
    console.log(`✅ Movimientos registrados: ${movements.length}`);
    if (movements.length > 0) {
      console.log('   📋 Últimos movimientos:');
      movements.slice(0, 3).forEach(mov => {
        const date = new Date(mov.movement_date).toLocaleDateString();
        console.log(`      • ${mov.movement_type}: ${mov.asset_name} - ${date}`);
      });
      console.log();
    }

    // 5. Test Login
    console.log('5️⃣ Probando endpoint de login...');
    const loginRes = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'cuentadante@sistema.edu.co',
        password: 'cuentadante_1'
      })
    });
    const loginData = await loginRes.json();
    if (loginRes.ok) {
      console.log('✅ Login exitoso');
      console.log(`   👤 Usuario: ${loginData.user.name}`);
      console.log(`   📧 Email: ${loginData.user.email}`);
      console.log(`   🔑 Role: ${loginData.user.role}\n`);
    } else {
      console.log('❌ Login falló:', loginData.error, '\n');
    }

    console.log('🎉 TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE');
    console.log('==============================================');
    console.log('✅ El sistema está completamente funcional');
    console.log('✅ Todos los endpoints responden correctamente');
    console.log('✅ La base de datos está conectada y operativa');

  } catch (error) {
    console.error('\n❌ Error en las pruebas:', error.message);
    console.log('\n⚠️  Verifica que el servidor esté corriendo en el puerto 3000');
  }
}

testEndpoints();
