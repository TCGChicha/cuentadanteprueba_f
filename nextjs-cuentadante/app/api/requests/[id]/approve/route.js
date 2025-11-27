import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { approved_by, notes } = await request.json()

    const currentRequest = await pool.query('SELECT * FROM requests WHERE id = $1', [id])
    if (currentRequest.rows.length === 0) {
      return NextResponse.json({ error: 'Solicitud no encontrada' }, { status: 404 })
    }

    const req = currentRequest.rows[0]

    const assetCheck = await pool.query('SELECT * FROM assets WHERE id = $1', [req.asset_id])
    if (assetCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Bien no encontrado' }, { status: 404 })
    }

    const asset = assetCheck.rows[0]
    if (asset.status !== 'Available') {
      return NextResponse.json(
        { error: `El bien ya no está disponible. Estado actual: ${asset.status}` },
        { status: 400 }
      )
    }

    await pool.query(
      `UPDATE assets 
       SET status = 'Assigned', 
           assigned_to = $1, 
           assignment_date = CURRENT_TIMESTAMP,
           expected_return_date = $2
       WHERE id = $3`,
      [req.applicant_name, req.expected_return_date, req.asset_id]
    )

    await pool.query(
      `INSERT INTO asset_movements (asset_id, movement_type, to_person, reason, authorized_by, notes)
       VALUES ($1, 'ASSIGNMENT', $2, $3, $4, $5)`,
      [req.asset_id, req.applicant_name, req.reason, approved_by, notes]
    )

    const result = await pool.query(
      `UPDATE requests 
       SET status = 'Aprobado', 
           approved_by = $1, 
           approval_date = CURRENT_TIMESTAMP,
           notes = $2
       WHERE id = $3 RETURNING *`,
      [approved_by, notes, id]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error aprobando solicitud:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
