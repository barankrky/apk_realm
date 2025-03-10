import { NextResponse } from 'next/server'
import { seed } from '@/lib/seed'

export async function GET() {
  try {
    await seed()
    return NextResponse.json({ success: true, message: 'Veriler başarıyla eklendi' })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Veriler eklenirken hata oluştu', error },
      { status: 500 }
    )
  }
} 