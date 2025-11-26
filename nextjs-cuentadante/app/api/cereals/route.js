import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM cereals ORDER BY name')
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, description, unit_of_measure, stock_quantity, minimum_stock } = await request.json()
    const result = await pool.query(
      `INSERT INTO cereals (name, description, unit_of_measure, stock_quantity, minimum_stock) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description, unit_of_measure || 'kg', stock_quantity || 0, minimum_stock || 0]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
