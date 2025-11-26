import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { quantity, operation } = await request.json()

    const currentCereal = await pool.query('SELECT * FROM cereals WHERE id = $1', [id])
    if (currentCereal.rows.length === 0) {
      return NextResponse.json({ error: 'Cereal not found' }, { status: 404 })
    }

    const currentStock = parseFloat(currentCereal.rows[0].stock_quantity)
    const changeAmount = parseFloat(quantity)

    let newStock
    if (operation === 'subtract') {
      newStock = currentStock - changeAmount
      if (newStock < 0) {
        return NextResponse.json({ error: 'Stock insuficiente' }, { status: 400 })
      }
    } else if (operation === 'add') {
      newStock = currentStock + changeAmount
    } else {
      return NextResponse.json({ error: 'Operación inválida' }, { status: 400 })
    }

    const result = await pool.query(
      'UPDATE cereals SET stock_quantity = $1 WHERE id = $2 RETURNING *',
      [newStock, id]
    )

    return NextResponse.json(result.rows[0])
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
