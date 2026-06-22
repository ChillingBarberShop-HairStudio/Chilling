<script setup lang="ts">
import { Check, Phone, X } from 'lucide-vue-next'
import { BRANCH } from '../../data/branchData'

defineProps<{ bookingCode: string }>()
const emit = defineEmits<{ close: []; reset: [] }>()
</script>

<template>
  <Teleport to="body">
    <div class="modal-backdrop" role="presentation" @click.self="emit('close')">
      <section class="modal-card" role="dialog" aria-modal="true" aria-labelledby="success-title">
        <button type="button" class="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-muted hover:bg-stone-100" aria-label="Đóng" @click="emit('close')"><X :size="20" /></button>
        <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600"><Check :size="32" stroke-width="2.5" /></div>
        <p class="mt-5 text-xs font-bold uppercase tracking-[.22em] text-emerald-600">Đã ghi nhận</p>
        <h2 id="success-title" class="mt-2 font-display text-3xl font-black">Đặt lịch thành công!</h2>
        <p class="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted">Cảm ơn anh/chị đã đặt lịch tại Chilling Barber Shop. Chúng tôi rất mong được đón tiếp bạn.</p>
        <div class="mx-auto mt-6 max-w-xs rounded-2xl bg-stone-100 p-4">
          <p class="text-xs uppercase tracking-wider text-muted">Mã đặt lịch</p>
          <p class="mt-1 font-mono text-base font-bold text-ink">{{ bookingCode }}</p>
        </div>
        <div class="mt-7 grid gap-3 sm:grid-cols-2">
          <button type="button" class="btn-dark justify-center" @click="emit('reset')">Đặt lịch mới</button>
          <a :href="BRANCH.phoneLink" class="btn-outline justify-center"><Phone :size="18" /> Gọi hotline</a>
        </div>
      </section>
    </div>
  </Teleport>
</template>
