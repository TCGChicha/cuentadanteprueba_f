import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { rejected_by, rejection_reason } = await request.json()

    const currentRequest = await pool.query('SELECT * FROM requests WHERE id = $1', [id])
    if (currentRequest.rows.length === 0) {
      return NextResponse.json({ error: 'Solicitud no encontrada' }, { status: 404 })
    }

    const result = await pool.query(
      `UPDATE requests 
       SET status = 'Rechazado', 
           rejection_reason = $1, 
           rejected_by = $2, 
           rejection_date = CURRENT_TIMESTAMP
       WHERE id = $3 RETURNING *`,
      [rejection_reason, rejected_by, id]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error rechazando solicitud:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
