import { ref } from 'vue'
import type { ServiceGroup, ServiceItem } from '../types/booking'
import { supabase } from '../lib/supabase'

export const SERVICE_CATALOG = ref<ServiceGroup[]>([])

export const fetchServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('group_name')
    .order('name')

  if (error || !data) {
    console.error('Error fetching services:', error)
    return
  }

  // Group by group_name
  const grouped = data.reduce((acc: Record<string, ServiceGroup>, item: any) => {
    if (!acc[item.group_name]) {
      // Create a slug for ID
      const groupId = item.group_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      acc[item.group_name] = {
        id: groupId,
        groupName: item.group_name,
        services: []
      }
    }

    acc[item.group_name].services.push({
      id: item.id,
      name: item.name,
      price: item.price,
      durationMinutes: item.duration_minutes,
      staffRole: item.staff_role,
      staffOptions: item.staff_options
    } as ServiceItem)

    return acc
  }, {})

  SERVICE_CATALOG.value = Object.values(grouped)
}
