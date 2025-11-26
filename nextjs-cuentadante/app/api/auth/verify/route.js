import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Token no proporcionado' },
        { status: 401 }
      )
    }

    if (token.startsWith('token_')) {
      const userId = token.split('_')[1]

      const result = await pool.query(
        'SELECT id, name, email, role FROM users WHERE id = $1',
        [userId]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'Token inválido' },
          { status: 401 }
        )
      }

      return NextResponse.json({
        valid: true,
        user: result.rows[0]
      })
    } else {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Error verificando token' },
      { status: 500 }
    )
  }
}
