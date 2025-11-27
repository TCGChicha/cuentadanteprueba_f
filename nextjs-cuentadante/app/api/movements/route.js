import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        am.*,
        a.name as asset_name,
        a.serial_number as asset_serial,
        a.inventory_number as asset_inventory,
        a.brand as asset_brand,
        a.model as asset_model,
        a.category as asset_category
      FROM asset_movements am
      JOIN assets a ON am.asset_id = a.id
      ORDER BY am.movement_date DESC
    `)
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching movements:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
