import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM assets ORDER BY name ASC')
    return NextResponse.json(result.rows)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, description, serial_number, inventory_number, status } = await request.json()
    const result = await pool.query(
      'INSERT INTO assets (name, description, serial_number, inventory_number, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, serial_number, inventory_number, status]
    )
    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
