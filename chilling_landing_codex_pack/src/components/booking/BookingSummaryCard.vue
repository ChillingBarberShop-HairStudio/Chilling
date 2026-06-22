<script setup lang="ts">
import { CalendarClock, Phone, ReceiptText } from 'lucide-vue-next'
import { BRANCH } from '../../data/branchData'
import type { BookingPayload } from '../../types/booking'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatStaffLabel } from '../../utils/staff'

const baseUrl = import.meta.env.BASE_URL
defineProps<{
  services: BookingPayload['services']
  subtotal: number
  discount: number
  totalAmount: number
  totalDurationMinutes: number
  date: string
  timeSlot: string
}>()

function formatDate(value: string): string {
  if (!value) return 'Chưa chọn ngày'
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}
</script>

<template>
  <aside class="summary-card" aria-label="Tóm tắt lịch đặt">
    <div class="flex items-center gap-4 border-b border-stone-200 p-5 sm:p-6">
      <img :src="`${baseUrl}logo.PNG`" alt="" class="h-14 w-14 rounded-full object-cover ring-1 ring-stone-200" />
      <div>
        <h3 class="font-display text-lg font-black uppercase">Chilling Barber Shop</h3>
        <a :href="BRANCH.phoneLink" class="mt-1 flex items-center gap-1.5 text-xs text-muted hover:text-ink"><Phone :size="13" /> Hotline: 0327969930</a>
        <p class="mt-1 text-xs text-muted">Giờ mở cửa: <strong class="text-ink">09:00 - 20:00</strong></p>
      </div>
    </div>

    <div class="p-5 sm:p-6">
      <div class="flex items-center justify-between">
        <h4 class="text-base font-bold">Dịch vụ ({{ services.length }})</h4>
        <ReceiptText :size="19" class="text-gold-dark" />
      </div>
      <div v-if="services.length" class="mt-4 divide-y divide-dashed divide-stone-200">
        <div v-for="service in services" :key="service.serviceName + service.staffName" class="py-3 first:pt-0">
          <div class="flex justify-between gap-4 text-sm">
            <span class="font-semibold text-ink">{{ service.serviceName }}</span>
            <span class="shrink-0 text-muted">{{ service.quantity }} x {{ formatCurrency(service.price) }}</span>
          </div>
          <p class="mt-1 text-xs text-muted">Thực hiện: {{ formatStaffLabel(service.staffName) }} · {{ service.durationMinutes }} phút</p>
        </div>
      </div>
      <div v-else class="mt-4 rounded-2xl bg-stone-100 px-4 py-5 text-center text-sm text-muted">
        Dịch vụ bạn chọn sẽ xuất hiện tại đây.
      </div>

      <div class="mt-5 rounded-2xl bg-stone-100 p-4 text-sm">
        <div class="flex items-start gap-3">
          <CalendarClock :size="18" class="mt-0.5 shrink-0 text-gold-dark" />
          <div>
            <p class="font-semibold">{{ formatDate(date) }}</p>
            <p class="mt-1 text-xs text-muted">{{ timeSlot ? `Lúc ${timeSlot}` : 'Chưa chọn khung giờ' }}</p>
          </div>
        </div>
      </div>

      <dl class="mt-6 space-y-3 border-t border-stone-200 pt-5 text-sm">
        <div class="flex justify-between"><dt class="text-muted">Tạm tính</dt><dd class="font-semibold">{{ formatCurrency(subtotal) }}</dd></div>
        <div class="flex justify-between"><dt class="text-muted">Giảm giá</dt><dd>{{ formatCurrency(discount) }}</dd></div>
        <div class="flex justify-between"><dt class="text-muted">Thời gian dự kiến</dt><dd>{{ totalDurationMinutes }} phút</dd></div>
        <div class="flex items-end justify-between border-t border-stone-200 pt-4">
          <dt class="font-bold">Tổng tiền</dt>
          <dd class="font-display text-2xl font-black text-gold-dark">{{ formatCurrency(totalAmount) }}</dd>
        </div>
      </dl>
    </div>
  </aside>
</template>
