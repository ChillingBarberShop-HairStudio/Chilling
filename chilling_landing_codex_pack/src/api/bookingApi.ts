import type { BookingPayload } from '../types/booking'
import { supabase } from '../lib/supabase'

export type BookingResult = {
  ok: true
  mode: 'preview' | 'api'
  bookingCode: string
}

export async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
  if (!supabase) {
    const bookingCode = `PREVIEW-${Date.now()}`
    console.info('Supabase is not configured. Preview booking payload:', payload)
    return { ok: true, mode: 'preview', bookingCode }
  }

  const { data, error } = await supabase.rpc('create_public_booking', { p_payload: payload })
  if (error) {
    console.error('Public booking RPC error:', error)
    throw new Error('Không thể gửi lịch đặt. Vui lòng thử lại.')
  }

  const result = data as { bookingCode?: string } | null
  if (!result?.bookingCode) throw new Error('Hệ thống không trả về mã đặt lịch hợp lệ.')
  return { ok: true, mode: 'api', bookingCode: result.bookingCode }
}
