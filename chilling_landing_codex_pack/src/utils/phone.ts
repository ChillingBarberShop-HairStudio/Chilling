export function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9+]/g, '').replace(/^\+84/, '0')
}

export function isValidVietnamesePhone(phone: string): boolean {
  return /^0(?:3|5|7|8|9)\d{8}$/.test(normalizePhone(phone))
}
