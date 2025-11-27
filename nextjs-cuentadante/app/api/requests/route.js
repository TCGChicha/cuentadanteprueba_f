import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT r.*, 
             a.name as asset_name,
             a.serial_number as asset_serial,
             a.inventory_number as asset_inventory,
             a.brand as asset_brand,
             a.model as asset_model,
             a.category as asset_category,
             a.status as asset_status
      FROM requests r
      JOIN assets a ON r.asset_id = a.id
      ORDER BY r.request_date DESC
    `)
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { applicant_name, asset_id, reason, priority, expected_return_date } = await request.json()

    if (!asset_id) {
      return NextResponse.json(
        { error: 'asset_id es requerido para solicitudes de bienes' },
        { status: 400 }
      )
    }

    const assetCheck = await pool.query('SELECT * FROM assets WHERE id = $1', [asset_id])
    if (assetCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Bien no encontrado' }, { status: 404 })
    }

    const asset = assetCheck.rows[0]
    if (asset.status !== 'Available') {
      return NextResponse.json(
        { error: `El bien "${asset.name}" (S/N: ${asset.serial_number}) no está disponible. Estado actual: ${asset.status}` },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `INSERT INTO requests (applicant_name, asset_id, reason, priority, expected_return_date) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [applicant_name, asset_id, reason, priority || 'Media', expected_return_date]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
