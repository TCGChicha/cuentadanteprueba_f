import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const stats = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM assets) as total_assets,
        (SELECT COUNT(*) FROM assets WHERE status = 'Available') as available_assets,
        (SELECT COUNT(*) FROM assets WHERE status = 'Assigned') as assigned_assets,
        (SELECT COUNT(*) FROM requests WHERE status = 'Pendiente') as pending_requests,
        (SELECT COUNT(*) FROM requests) as total_requests,
        (SELECT COUNT(*) FROM requests WHERE status = 'Aprobado') as approved_requests,
        (SELECT COUNT(*) FROM requests WHERE status = 'Rechazado') as rejected_requests,
        (SELECT COUNT(*) FROM asset_movements) as total_movements,
        (SELECT ROUND(AVG(current_value), 2) FROM assets WHERE current_value IS NOT NULL) as avg_asset_value,
        (SELECT SUM(current_value) FROM assets WHERE current_value IS NOT NULL) as total_asset_value
    `)

    return NextResponse.json(stats.rows[0])
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
