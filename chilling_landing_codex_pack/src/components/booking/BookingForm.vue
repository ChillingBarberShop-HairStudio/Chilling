<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { CalendarCheck2, ChevronDown, LoaderCircle, Minus, Plus, StickyNote, UserRound } from 'lucide-vue-next'
import { submitBooking } from '../../api/bookingApi'
import { BRANCH } from '../../data/branchData'
import { SERVICE_CATALOG } from '../../data/serviceCatalog'
import type { BookingPayload, BookingServiceSelection, ServiceGroup, ServiceItem } from '../../types/booking'
import { formatCurrency } from '../../utils/formatCurrency'
import { isValidVietnamesePhone, normalizePhone } from '../../utils/phone'
import { formatStaffLabel } from '../../utils/staff'
import { isDateTodayOrLater, todayLocal } from '../../utils/validation'
import BookingSuccessModal from './BookingSuccessModal.vue'
import BookingSummaryCard from './BookingSummaryCard.vue'
import TimeSlotGrid from './TimeSlotGrid.vue'

const phone = ref('')
const fullName = ref('')
const totalGuests = ref(1)
const appointmentDate = ref('')
const timeSlot = ref('')
const note = ref('')
const showNote = ref(false)
const attempted = ref(false)
const submitting = ref(false)
const submitError = ref('')
const successCode = ref('')
let rowId = 1

const serviceRows = ref<BookingServiceSelection[]>([
  { id: rowId, groupId: '', serviceId: '', staffName: '', quantity: 1 },
])

function groupFor(row: BookingServiceSelection): ServiceGroup | undefined {
  return SERVICE_CATALOG.find((group) => group.id === row.groupId)
}

function serviceFor(row: BookingServiceSelection): ServiceItem | undefined {
  return groupFor(row)?.services.find((service) => service.id === row.serviceId)
}

function onGroupChange(row: BookingServiceSelection) {
  row.serviceId = ''
  row.staffName = ''
}

function onServiceChange(row: BookingServiceSelection) {
  row.staffName = ''
}

function addService() {
  rowId += 1
  serviceRows.value.push({ id: rowId, groupId: '', serviceId: '', staffName: '', quantity: 1 })
  nextTick(() => document.querySelector<HTMLElement>(`[data-service-row="${rowId}"] select`)?.focus())
}

function removeService(id: number) {
  if (serviceRows.value.length === 1) return
  serviceRows.value = serviceRows.value.filter((row) => row.id !== id)
}

const resolvedServices = computed<BookingPayload['services']>(() => {
  return serviceRows.value.flatMap((row) => {
    const group = groupFor(row)
    const service = serviceFor(row)
    if (!group || !service || !row.staffName) return []
    return [{
      groupName: group.groupName,
      serviceName: service.name,
      staffName: row.staffName,
      price: service.price,
      durationMinutes: service.durationMinutes,
      quantity: row.quantity,
    }]
  })
})

const subtotal = computed(() => resolvedServices.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
const discount = 0
const totalAmount = computed(() => subtotal.value - discount)
const totalDurationMinutes = computed(() => resolvedServices.value.reduce((sum, item) => sum + item.durationMinutes * item.quantity, 0))
const rowsValid = computed(() => serviceRows.value.length > 0 && resolvedServices.value.length === serviceRows.value.length)
const formValid = computed(() =>
  isValidVietnamesePhone(phone.value) &&
  fullName.value.trim().length >= 2 &&
  totalGuests.value >= 1 && totalGuests.value <= 10 &&
  isDateTodayOrLater(appointmentDate.value) &&
  rowsValid.value && Boolean(timeSlot.value),
)

function buildPayload(): BookingPayload {
  return {
    customer: { phone: normalizePhone(phone.value), fullName: fullName.value.trim(), totalGuests: totalGuests.value },
    branch: { name: BRANCH.name, address: BRANCH.address },
    appointment: { date: appointmentDate.value, timeSlot: timeSlot.value },
    services: resolvedServices.value,
    subtotal: subtotal.value,
    discount,
    totalAmount: totalAmount.value,
    totalDurationMinutes: totalDurationMinutes.value,
    ...(showNote.value && note.value.trim() ? { note: note.value.trim() } : {}),
    source: 'landing_page',
  }
}

async function handleSubmit() {
  attempted.value = true
  submitError.value = ''
  if (!formValid.value || submitting.value) return
  submitting.value = true
  try {
    const payload = buildPayload()
    console.log('Chilling Barber Shop booking payload:', payload)
    const result = await submitBooking(payload)
    successCode.value = result.bookingCode
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại.'
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  phone.value = ''
  fullName.value = ''
  totalGuests.value = 1
  appointmentDate.value = ''
  timeSlot.value = ''
  note.value = ''
  showNote.value = false
  attempted.value = false
  successCode.value = ''
  rowId += 1
  serviceRows.value = [{ id: rowId, groupId: '', serviceId: '', staffName: '', quantity: 1 }]
  document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <form class="booking-layout" novalidate @submit.prevent="handleSubmit">
    <div class="booking-form-card">
      <div class="border-b border-stone-200 p-5 sm:p-7">
        <div class="flex items-center gap-3">
          <span class="step-badge">01</span>
          <div><h3 class="text-lg font-bold">Thông tin của bạn</h3><p class="mt-1 text-sm text-muted">Chúng tôi dùng thông tin này để xác nhận lịch.</p></div>
        </div>
        <div class="mt-6 grid gap-5 sm:grid-cols-2">
          <label class="field-group">
            <span class="field-label">Số điện thoại <span>*</span></span>
            <input v-model.trim="phone" type="tel" inputmode="tel" autocomplete="tel" class="form-control" placeholder="Ví dụ: 032 796 9930" :aria-invalid="attempted && !isValidVietnamesePhone(phone)" />
            <span v-if="attempted && !isValidVietnamesePhone(phone)" class="field-error">Vui lòng nhập số điện thoại Việt Nam hợp lệ.</span>
          </label>
          <label class="field-group">
            <span class="field-label">Họ và tên <span>*</span></span>
            <input v-model.trim="fullName" type="text" autocomplete="name" class="form-control" placeholder="Họ và tên khách hàng" :aria-invalid="attempted && fullName.trim().length < 2" />
            <span v-if="attempted && fullName.trim().length < 2" class="field-error">Họ tên cần có ít nhất 2 ký tự.</span>
          </label>
          <label class="field-group sm:col-span-2">
            <span class="field-label">Tổng số khách</span>
            <input v-model.number="totalGuests" type="number" min="1" max="10" class="form-control" />
            <span v-if="attempted && (totalGuests < 1 || totalGuests > 10)" class="field-error">Số khách phải từ 1 đến 10.</span>
          </label>
        </div>
      </div>

      <div class="border-b border-stone-200 p-5 sm:p-7">
        <div class="flex items-center gap-3">
          <span class="step-badge">02</span>
          <div><h3 class="text-lg font-bold">Thông tin lịch hẹn</h3><p class="mt-1 text-sm text-muted">Chọn địa điểm và ngày bạn muốn ghé.</p></div>
        </div>
        <div class="mt-6 grid gap-5">
          <label class="field-group">
            <span class="field-label">Chọn chi nhánh <span>*</span></span>
            <span class="branch-choice"><span class="radio-dot"></span><span>{{ BRANCH.address }}</span></span>
          </label>
          <label class="field-group">
            <span class="field-label">Ngày đặt lịch <span>*</span></span>
            <input v-model="appointmentDate" type="date" :min="todayLocal()" class="form-control" :aria-invalid="attempted && !isDateTodayOrLater(appointmentDate)" />
            <span v-if="attempted && !isDateTodayOrLater(appointmentDate)" class="field-error">Vui lòng chọn hôm nay hoặc một ngày sắp tới.</span>
          </label>
        </div>
      </div>

      <div class="border-b border-stone-200 p-5 sm:p-7">
        <div class="flex items-center gap-3">
          <span class="step-badge">03</span>
          <div><h3 class="text-lg font-bold">Dịch vụ</h3><p class="mt-1 text-sm text-muted">Có thể thêm nhiều dịch vụ trong cùng một lịch.</p></div>
        </div>

        <div class="mt-6 space-y-4">
          <div v-for="(row, index) in serviceRows" :key="row.id" :data-service-row="row.id" class="service-row">
            <div class="mb-4 flex items-center justify-between">
              <p class="flex items-center gap-2 text-sm font-bold"><UserRound :size="16" /> Khách {{ index + 1 }}</p>
              <button v-if="serviceRows.length > 1" type="button" class="remove-button" :aria-label="`Xóa dịch vụ ${index + 1}`" @click="removeService(row.id)"><Minus :size="16" /> Xóa</button>
            </div>
            <div class="grid gap-3 lg:grid-cols-3">
              <label class="select-wrap">
                <span class="sr-only">Nhóm dịch vụ</span>
                <select v-model="row.groupId" class="form-control appearance-none pr-10" @change="onGroupChange(row)">
                  <option value="">Chọn nhóm dịch vụ *</option>
                  <option v-for="group in SERVICE_CATALOG" :key="group.id" :value="group.id">{{ group.groupName }}</option>
                </select><ChevronDown :size="17" />
              </label>
              <label class="select-wrap">
                <span class="sr-only">Dịch vụ</span>
                <select v-model="row.serviceId" class="form-control appearance-none pr-10" :disabled="!row.groupId" @change="onServiceChange(row)">
                  <option value="">Chọn dịch vụ *</option>
                  <option v-for="service in groupFor(row)?.services ?? []" :key="service.id" :value="service.id">{{ service.name }} · {{ formatCurrency(service.price) }}</option>
                </select><ChevronDown :size="17" />
              </label>
              <label class="select-wrap">
                <span class="sr-only">Nhân viên thực hiện</span>
                <select v-model="row.staffName" class="form-control appearance-none pr-10" :disabled="!row.serviceId">
                  <option value="">Chọn nhân viên *</option>
                  <option v-for="staff in serviceFor(row)?.staffOptions ?? []" :key="staff" :value="staff">{{ formatStaffLabel(staff) }}</option>
                </select><ChevronDown :size="17" />
              </label>
            </div>
            <div v-if="serviceFor(row)" class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
              <span><strong class="text-ink">{{ formatCurrency(serviceFor(row)!.price) }}</strong></span>
              <span>{{ serviceFor(row)!.durationMinutes }} phút</span>
            </div>
            <p v-if="attempted && (!row.groupId || !row.serviceId || !row.staffName)" class="field-error mt-3">Hãy chọn đủ nhóm, dịch vụ và nhân viên.</p>
          </div>
        </div>

        <button type="button" class="add-service-button mt-4" :disabled="serviceRows.length >= 6" @click="addService"><Plus :size="17" /> Thêm dịch vụ</button>
      </div>

      <div class="p-5 sm:p-7">
        <TimeSlotGrid v-model="timeSlot" />
        <p v-if="attempted && !timeSlot" class="field-error mt-3">Vui lòng chọn một khung giờ.</p>

        <div class="mt-7 border-t border-stone-200 pt-6">
          <button type="button" class="flex min-h-11 items-center gap-2 text-sm font-semibold text-ink hover:text-gold-dark" :aria-expanded="showNote" @click="showNote = !showNote">
            <StickyNote :size="17" /> {{ showNote ? 'Ẩn ghi chú' : 'Hiện ghi chú' }}
          </button>
          <label v-if="showNote" class="field-group mt-3">
            <span class="sr-only">Ghi chú</span>
            <textarea v-model="note" rows="3" maxlength="500" class="form-control resize-y" placeholder="Kiểu tóc mong muốn hoặc điều Chilling cần lưu ý..."></textarea>
          </label>
        </div>

        <p class="mt-7 text-xs leading-5 text-muted">Với việc nhấn nút “Đặt lịch” đồng nghĩa bạn đã đồng ý với Chính sách bảo vệ dữ liệu cá nhân của ChillingHairStudio.</p>
        <p v-if="submitError" class="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{{ submitError }}</p>
        <button type="submit" class="booking-submit mt-5" :disabled="!formValid || submitting">
          <LoaderCircle v-if="submitting" :size="19" class="animate-spin" />
          <CalendarCheck2 v-else :size="19" />
          {{ submitting ? 'Đang ghi nhận...' : 'Đặt lịch' }}
        </button>
        <p v-if="attempted && !formValid" class="mt-3 text-center text-xs text-muted">Vui lòng hoàn tất các trường bắt buộc phía trên.</p>
      </div>
    </div>

    <div class="summary-column">
      <BookingSummaryCard
        :services="resolvedServices"
        :subtotal="subtotal"
        :discount="discount"
        :total-amount="totalAmount"
        :total-duration-minutes="totalDurationMinutes"
        :date="appointmentDate"
        :time-slot="timeSlot"
      />
      <div class="mt-4 rounded-3xl bg-ink p-6 text-white">
        <p class="text-xs font-bold uppercase tracking-[.2em] text-gold">Cần hỗ trợ?</p>
        <p class="mt-3 text-sm leading-6 text-stone-300">Gọi ngay cho Chilling để được tư vấn kiểu tóc hoặc sắp xếp lịch phù hợp.</p>
        <a :href="BRANCH.phoneLink" class="mt-5 inline-flex items-center gap-2 font-bold hover:text-gold"><span class="grid h-9 w-9 place-items-center rounded-full bg-white/10">☎</span> {{ BRANCH.phone }}</a>
      </div>
    </div>
  </form>

  <BookingSuccessModal v-if="successCode" :booking-code="successCode" @close="successCode = ''" @reset="resetForm" />
</template>
