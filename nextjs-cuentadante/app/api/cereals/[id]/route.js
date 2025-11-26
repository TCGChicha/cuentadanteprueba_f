import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request, { params }) {
  try {
    const { id } = params
    const result = await pool.query('SELECT * FROM cereals WHERE id = $1', [id])
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Cereal not found' }, { status: 404 })
    }
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { name, description, unit_of_measure, stock_quantity, minimum_stock } = await request.json()
    const result = await pool.query(
      `UPDATE cereals 
       SET name = $1, description = $2, unit_of_measure = $3, 
           stock_quantity = $4, minimum_stock = $5
       WHERE id = $6 RETURNING *`,
      [name, description, unit_of_measure, stock_quantity, minimum_stock, id]
    )
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Cereal not found' }, { status: 404 })
    }
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const result = await pool.query('DELETE FROM cereals WHERE id = $1 RETURNING *', [id])
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Cereal not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Cereal deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
