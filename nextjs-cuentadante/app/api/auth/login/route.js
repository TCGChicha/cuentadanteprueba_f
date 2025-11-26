import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    const user = result.rows[0]

    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      )
    }

    if (user.role !== 'Cuentadante') {
      return NextResponse.json(
        { error: 'Acceso denegado. Solo cuentadantes pueden acceder al sistema.' },
        { status: 403 }
      )
    }

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'Login exitoso',
      user: userWithoutPassword,
      token: `token_${user.id}_${Date.now()}`
    })
  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
