console.log('🧪 PRUEBA DE CREACIÓN DE SOLICITUD');
console.log('===================================\n');

async function testCreateRequest() {
  const baseUrl = 'http://localhost:3000/api';
  
  try {
    // 1. Obtener bienes disponibles
    console.log('1️⃣ Obteniendo bienes disponibles...');
    const assetsRes = await fetch(`${baseUrl}/assets`);
    const assets = await assetsRes.json();
    const availableAssets = assets.filter(a => a.status === 'Available');
    
    console.log(`✅ Bienes disponibles: ${availableAssets.length}`);
    if (availableAssets.length > 0) {
      console.log(`   📦 Primer bien disponible: ${availableAssets[0].name} (ID: ${availableAssets[0].id})\n`);
    } else {
      console.log('❌ No hay bienes disponibles para crear solicitud\n');
      return;
    }

    // 2. Crear una solicitud de prueba
    console.log('2️⃣ Creando solicitud de prueba...');
    const testRequest = {
      applicant_name: 'Pedro Ramírez - Instructor',
      applicant_position: 'Instructor de Diseño Gráfico',
      asset_id: availableAssets[0].id,
      reason: 'Necesito este equipo para el taller de diseño digital con estudiantes del programa técnico. Duración: 2 semanas.',
      priority: 'Media',
      expected_return_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // +14 días
    };

    console.log('📋 Datos de la solicitud:');
    console.log(`   Solicitante: ${testRequest.applicant_name}`);
    console.log(`   Cargo: ${testRequest.applicant_position}`);
    console.log(`   Bien: ${availableAssets[0].name}`);
    console.log(`   Prioridad: ${testRequest.priority}`);
    console.log(`   Devolución: ${testRequest.expected_return_date}\n`);

    const createRes = await fetch(`${baseUrl}/requests/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testRequest)
    });

    if (createRes.ok) {
      const result = await createRes.json();
      console.log('✅ Solicitud creada exitosamente!');
      console.log(`   ID de solicitud: ${result.request.id}`);
      console.log(`   Estado: ${result.request.status}\n`);
    } else {
      const error = await createRes.json();
      console.log('❌ Error al crear solicitud:', error.error, '\n');
      return;
    }

    // 3. Verificar que la solicitud se creó
    console.log('3️⃣ Verificando solicitudes pendientes...');
    const requestsRes = await fetch(`${baseUrl}/requests`);
    const requests = await requestsRes.json();
    const pendientes = requests.filter(r => r.status === 'Pendiente');
    
    console.log(`✅ Solicitudes pendientes: ${pendientes.length}`);
    console.log('\n📋 Últimas solicitudes pendientes:');
    pendientes.slice(0, 3).forEach(req => {
      console.log(`   • ${req.applicant_name} - ${req.asset_name} (${req.priority})`);
    });

    console.log('\n🎉 PRUEBA COMPLETADA EXITOSAMENTE');
    console.log('=====================================');
    console.log('✅ El endpoint de creación de solicitudes funciona correctamente');
    console.log('✅ Las solicitudes se guardan en la base de datos');

  } catch (error) {
    console.error('\n❌ Error en la prueba:', error.message);
    console.log('\n⚠️  Verifica que el servidor esté corriendo en el puerto 3000');
  }
}

testCreateRequest();
