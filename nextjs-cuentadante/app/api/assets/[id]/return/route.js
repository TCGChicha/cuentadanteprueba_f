import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { notes, returned_by } = await request.json()

    const assetCheck = await pool.query('SELECT * FROM assets WHERE id = $1', [id])
    if (assetCheck.rows.length === 0) {
      return NextResponse.json({ error: 'Bien no encontrado' }, { status: 404 })
    }

    const asset = assetCheck.rows[0]
    if (asset.status !== 'Assigned') {
      return NextResponse.json({ error: 'El bien no está asignado' }, { status: 400 })
    }

    const assigned_person = asset.assigned_to

    await pool.query(
      `UPDATE assets 
       SET status = 'Available',
           assigned_to = NULL,
           assignment_date = NULL,
           expected_return_date = NULL
       WHERE id = $1`,
      [id]
    )

    await pool.query(
      `UPDATE requests 
       SET actual_return_date = CURRENT_DATE
       WHERE asset_id = $1 AND status = 'Aprobado' AND actual_return_date IS NULL`,
      [id]
    )

    await pool.query(
      `INSERT INTO asset_movements (asset_id, movement_type, from_person, reason, authorized_by, notes)
       VALUES ($1, 'RETURN', $2, 'Devolución de bien', $3, $4)`,
      [id, assigned_person, returned_by, notes]
    )

    return NextResponse.json({ message: 'Bien devuelto exitosamente' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
