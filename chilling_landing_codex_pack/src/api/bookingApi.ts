import type { BookingPayload } from '../types/booking'
import { supabase } from '../lib/supabase'

export type BookingResult = {
  ok: true
  mode: 'preview' | 'api'
  bookingCode: string
}

export async function submitBooking(payload: BookingPayload): Promise<BookingResult> {
  const bookingCode = `CHL-${Date.now().toString().slice(-6)}`
  const bookingId = crypto.randomUUID()
  
  // 1. Insert Booking
  const { error: bookingError } = await supabase
    .from('bookings')
    .insert({
      id: bookingId,
      booking_code: bookingCode,
      customer_phone: payload.customer.phone,
      customer_name: payload.customer.fullName,
      total_guests: payload.customer.totalGuests,
      branch_name: payload.branch.name,
      appointment_date: payload.appointment.date,
      time_slot: payload.appointment.timeSlot,
      status: 'waiting',
      subtotal: payload.subtotal,
      discount: payload.discount,
      total_amount: payload.totalAmount,
      total_duration_minutes: payload.totalDurationMinutes,
      note: payload.note || '',
      source: payload.source
    })

  if (bookingError) {
    console.error('Booking Error:', bookingError)
    throw new Error('Không thể gửi lịch đặt. Vui lòng thử lại.')
  }

  // 2. Insert Booking Services
  const servicesData = payload.services.map(svc => ({
    booking_id: bookingId,
    service_name: svc.serviceName,
    staff_name: svc.staffName || '',
    price: svc.price,
    duration_minutes: svc.durationMinutes,
    quantity: svc.quantity || 1
  }))

  const { error: servicesError } = await supabase
    .from('booking_services')
    .insert(servicesData)

  if (servicesError) {
    console.error('Booking Services Error:', servicesError)
    throw new Error('Đơn đặt thành công nhưng gặp lỗi lưu chi tiết dịch vụ.')
  }

  return { ok: true, mode: 'api', bookingCode }
}
