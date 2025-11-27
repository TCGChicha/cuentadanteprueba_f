import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request, { params }) {
  try {
    const { assetId } = params
    const result = await pool.query(`
      SELECT 
        am.*,
        a.name as asset_name,
        a.serial_number as asset_serial,
        a.inventory_number as asset_inventory
      FROM asset_movements am
      JOIN assets a ON am.asset_id = a.id
      WHERE am.asset_id = $1
      ORDER BY am.movement_date DESC
    `, [assetId])

    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching asset movements:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
