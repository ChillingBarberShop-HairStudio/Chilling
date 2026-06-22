const STAFF_LABELS: Record<string, string> = {
  'Boss Linh': 'Linh - Boss (Chủ quán)',
  Hương: 'Hương - Skinner',
  Nam: 'Nam - Barber',
  Thông: 'Thông - Barber',
}

export function formatStaffLabel(staffName: string): string {
  return STAFF_LABELS[staffName] ?? staffName
}
