import { ref } from 'vue'
import type { ServiceGroup } from '../types/booking'
import { supabase } from '../lib/supabase'

const FALLBACK_CATALOG: ServiceGroup[] = [
  { id: 'haircut', groupName: 'Cắt tóc', services: [
    { id: 'barber-cut', name: 'Thợ cắt (được quyền yêu cầu)', price: 70000, durationMinutes: 35, staffRole: 'barber', staffOptions: ['Thông'] },
    { id: 'owner-cut', name: 'Chủ quán cắt', price: 100000, durationMinutes: 45, staffRole: 'owner', staffOptions: ['Boss Linh'] },
  ] },
  { id: 'chemical', groupName: 'Uốn - Ép side - Tẩy - Nhuộm', services: [
    { id: 'fashion-color', name: 'Nhuộm màu thời trang (Free cắt)', price: 400000, durationMinutes: 180, staffRole: 'barber', staffOptions: ['Nam', 'Thông'] },
    { id: 'basic-color', name: 'Nhuộm màu cơ bản (Free cắt)', price: 300000, durationMinutes: 120, staffRole: 'barber', staffOptions: ['Nam', 'Thông'] },
    { id: 'trending-perm', name: 'Uốn tóc trending (Free cắt)', price: 450000, durationMinutes: 120, staffRole: 'barber', staffOptions: ['Nam', 'Thông'] },
    { id: 'basic-perm', name: 'Uốn tóc cơ bản (Free cắt)', price: 300000, durationMinutes: 90, staffRole: 'barber', staffOptions: ['Nam', 'Thông'] },
  ] },
  { id: 'relax', groupName: 'Dịch vụ thư giãn', services: [
    { id: 'full-massage', name: 'Massage mặt, cổ, vai gáy', price: 100000, durationMinutes: 120, staffRole: 'mixed', staffOptions: ['Hương', 'Thông', 'Nam'] },
    { id: 'shampoo', name: 'Gội đầu (Shampoo)', price: 60000, durationMinutes: 15, staffRole: 'mixed', staffOptions: ['Hương', 'Thông', 'Nam'] },
    { id: 'face-massage', name: 'Massage mặt', price: 20000, durationMinutes: 15, staffRole: 'mixed', staffOptions: ['Hương', 'Thông', 'Nam'] },
  ] },
  { id: 'extras', groupName: 'Dịch vụ riêng lẻ', services: [
    { id: 'eye-care', name: 'Đánh mắt', price: 50000, durationMinutes: 20, staffRole: 'mixed', staffOptions: ['Hương', 'Thông'] },
    { id: 'nails', name: 'Cắt móng tay, chân', price: 100000, durationMinutes: 20, staffRole: 'mixed', staffOptions: ['Hương', 'Thông'] },
    { id: 'gray-hair', name: 'Nhổ tóc bạc', price: 50000, durationMinutes: 30, staffRole: 'mixed', staffOptions: ['Hương', 'Thông'] },
    { id: 'face-steam', name: 'Xông mặt hút mụn', price: 50000, durationMinutes: 15, staffRole: 'skinner', staffOptions: ['Hương'] },
    { id: 'pore-care', name: 'Se lỗ ghèn', price: 80000, durationMinutes: 20, staffRole: 'skinner', staffOptions: ['Hương'] },
    { id: 'acne-care', name: 'Nặn mụn', price: 50000, durationMinutes: 30, staffRole: 'skinner', staffOptions: ['Hương'] },
  ] },
]

export const SERVICE_CATALOG = ref<ServiceGroup[]>(FALLBACK_CATALOG)

type CatalogRow = {
  id: string
  name: string
  category: string
  price: number
  durationMinutes: number
  providerRole?: 'barber' | 'skinner' | null
  staffOptions: string[]
}

export async function fetchServices() {
  if (!supabase) return
  const { data, error } = await supabase.rpc('public_booking_catalog')
  if (error || !Array.isArray(data) || !data.length) {
    console.info('Using fallback booking catalog until the public_booking_catalog RPC is available.', error?.message)
    return
  }

  const groups = new Map<string, ServiceGroup>()
  for (const [index, item] of (data as CatalogRow[]).entries()) {
    const group = groups.get(item.category) ?? { id: `group-${groups.size + 1}`, groupName: item.category, services: [] }
    group.services.push({
      id: item.id || `service-${index}`,
      name: item.name,
      price: Number(item.price),
      durationMinutes: Number(item.durationMinutes),
      staffRole: item.providerRole ?? 'barber',
      staffOptions: item.staffOptions ?? [],
    })
    groups.set(item.category, group)
  }
  SERVICE_CATALOG.value = [...groups.values()]
}
