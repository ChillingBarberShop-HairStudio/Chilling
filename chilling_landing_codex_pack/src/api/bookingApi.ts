import type { BookingPayload } from '../types/booking'

export type BookingResult = {
  ok: true
  mode: 'preview' | 'api'
  bookingCode: string
}

export async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
  const apiUrl = import.meta.env.VITE_BOOKING_API_URL

  if (!apiUrl) {
    console.info('Booking API not configured. Phase 1 preview payload:', payload)
    return { ok: true, mode: 'preview', bookingCode: `PREVIEW-${Date.now()}` }
  }

  const response = await fetch(`${apiUrl}/api/public/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error('Không thể gửi lịch đặt. Vui lòng thử lại.')
  return { ...(await response.json()), mode: 'api' } as BookingResult
}
