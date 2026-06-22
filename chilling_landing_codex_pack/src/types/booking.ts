export type StaffRole = 'barber' | 'owner' | 'mixed' | 'skinner'

export type ServiceItem = {
  id: string
  name: string
  price: number
  durationMinutes: number
  staffRole: StaffRole
  staffOptions: string[]
}

export type ServiceGroup = {
  id: string
  groupName: string
  services: ServiceItem[]
}

export type BookingServiceSelection = {
  id: number
  groupId: string
  serviceId: string
  staffName: string
  quantity: number
}

export type BookingPayload = {
  customer: {
    phone: string
    fullName: string
    totalGuests: number
  }
  branch: {
    name: string
    address: string
  }
  appointment: {
    date: string
    timeSlot: string
  }
  services: Array<{
    groupName: string
    serviceName: string
    staffName: string
    price: number
    durationMinutes: number
    quantity: number
  }>
  subtotal: number
  discount: number
  totalAmount: number
  totalDurationMinutes: number
  note?: string
  source: 'landing_page'
}
