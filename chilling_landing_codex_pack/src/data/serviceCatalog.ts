import type { ServiceGroup } from '../types/booking'

export const SERVICE_CATALOG: ServiceGroup[] = [
  {
    id: 'haircut',
    groupName: '1/. Đặt Lịch Cắt Tóc Tại Đây',
    services: [
      { id: 'barber-cut', name: 'Thợ cắt (được quyền yêu cầu)', price: 70000, durationMinutes: 35, staffRole: 'barber', staffOptions: ['Thông'] },
      { id: 'owner-cut', name: 'Chủ quán cắt', price: 100000, durationMinutes: 45, staffRole: 'owner', staffOptions: ['Boss Linh'] },
    ],
  },
  {
    id: 'chemical',
    groupName: '2. UỐN - ÉP SIDE - TẨY - NHUỘM',
    services: [
      { id: 'fashion-color', name: 'Nhuộm màu thời trang (Free cắt)', price: 400000, durationMinutes: 180, staffRole: 'barber', staffOptions: ['Nam', 'Thông'] },
      { id: 'basic-color', name: 'Nhuộm màu cơ bản (Free cắt)', price: 300000, durationMinutes: 120, staffRole: 'barber', staffOptions: ['Nam', 'Thông'] },
      { id: 'trending-perm', name: 'Uốn tóc trending (Free cắt)', price: 450000, durationMinutes: 120, staffRole: 'barber', staffOptions: ['Nam', 'Thông'] },
      { id: 'basic-perm', name: 'Uốn tóc cơ bản (Free cắt)', price: 300000, durationMinutes: 90, staffRole: 'barber', staffOptions: ['Nam', 'Thông'] },
    ],
  },
  {
    id: 'relax',
    groupName: '3. Dịch Vụ Thư Giãn',
    services: [
      { id: 'full-massage', name: 'Massage mặt, cổ, vai gáy', price: 100000, durationMinutes: 120, staffRole: 'mixed', staffOptions: ['Hương', 'Thông', 'Nam'] },
      { id: 'shampoo', name: 'Gội đầu (Shampoo)', price: 60000, durationMinutes: 15, staffRole: 'mixed', staffOptions: ['Hương', 'Thông', 'Nam'] },
      { id: 'face-massage', name: 'Massage mặt', price: 20000, durationMinutes: 15, staffRole: 'mixed', staffOptions: ['Hương', 'Thông', 'Nam'] },
    ],
  },
  {
    id: 'extras',
    groupName: '4. Dịch Vụ Riêng Lẻ',
    services: [
      { id: 'eye-care', name: 'Đánh mắt', price: 50000, durationMinutes: 20, staffRole: 'mixed', staffOptions: ['Hương', 'Thông'] },
      { id: 'nails', name: 'Cắt móng tay, chân', price: 100000, durationMinutes: 20, staffRole: 'mixed', staffOptions: ['Hương', 'Thông'] },
      { id: 'gray-hair', name: 'Nhổ tóc bạc', price: 50000, durationMinutes: 30, staffRole: 'mixed', staffOptions: ['Hương', 'Thông'] },
      { id: 'face-steam', name: 'Xông mặt hút mụn', price: 50000, durationMinutes: 15, staffRole: 'skinner', staffOptions: ['Hương'] },
      { id: 'pore-care', name: 'Se lỗ ghèn', price: 80000, durationMinutes: 20, staffRole: 'skinner', staffOptions: ['Hương'] },
      { id: 'acne-care', name: 'Nặn mụn', price: 50000, durationMinutes: 30, staffRole: 'skinner', staffOptions: ['Hương'] },
    ],
  },
]
