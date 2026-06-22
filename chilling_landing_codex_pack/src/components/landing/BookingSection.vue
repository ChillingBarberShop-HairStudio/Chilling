<script setup lang="ts">
import BookingForm from '../booking/BookingForm.vue'
import BarberPoleStrip from '../ui/BarberPoleStrip.vue'
</script>

<template>
  <section id="booking" class="section-pad relative scroll-mt-24 overflow-hidden bg-[#f4f6f8]">
    <BarberPoleStrip />
    <div class="page-shell">
      <div class="mx-auto mb-12 max-w-2xl text-center" data-reveal="right">
        <p class="eyebrow justify-center">Giữ chỗ tại Chilling</p>
        <h2 class="section-title">Đặt lịch trong vài phút</h2>
        <p class="mt-4 text-base leading-7 text-muted">Chọn dịch vụ và thời gian phù hợp. Chi phí dự kiến luôn được cập nhật rõ ràng trước khi bạn xác nhận.</p>
      </div>
      <div data-reveal><BookingForm /></div>
    </div>
  </section>
</template>
