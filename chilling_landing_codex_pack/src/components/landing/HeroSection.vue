<script setup lang="ts">
import { ArrowDown, CalendarDays, Clock3, MapPin } from 'lucide-vue-next'
import { BRANCH } from '../../data/branchData'
import BarberPoleStrip from '../ui/BarberPoleStrip.vue'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <section id="top" class="relative min-h-[calc(100svh-76px)] overflow-hidden bg-ink lg:min-h-[760px]">
    <BarberPoleStrip />
    <img :src="`${baseUrl}landing/anh1.PNG`" alt="Mặt tiền Chilling Barber Shop tại Bàu Bàng" class="hero-background absolute inset-0 h-full w-full object-cover" fetchpriority="high" />
    <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,16,14,.88)_0%,rgba(17,16,14,.61)_46%,rgba(17,16,14,.12)_100%)]"></div>
    <div class="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,16,14,.58)_0%,transparent_52%)]"></div>

    <div class="page-shell relative flex min-h-[calc(100svh-76px)] items-end py-14 sm:items-center lg:min-h-[760px] lg:py-24">
      <div class="hero-enter max-w-2xl text-white">
        <div class="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-gold-light">
          <span class="h-px w-10 bg-gold"></span> Hair studio tại Bàu Bàng
        </div>
        <h1 class="font-display text-5xl font-extrabold uppercase leading-[.98] tracking-[-.035em] sm:text-6xl lg:text-8xl">
          Chất riêng<br /><span class="text-gold-light">Chuẩn đẹp</span>
        </h1>
        <p class="mt-6 max-w-xl text-base leading-7 text-stone-200 sm:text-lg">
          Cắt tóc, uốn, nhuộm và chăm sóc diện mạo cùng đội ngũ barber tận tâm trong không gian chỉn chu, thoải mái.
        </p>
        <div class="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-stone-200">
          <span class="inline-flex items-center gap-2"><Clock3 :size="17" class="text-gold" /> {{ BRANCH.openingHours }}</span>
          <span class="inline-flex items-center gap-2"><MapPin :size="17" class="text-gold" /> KCN Bàu Bàng</span>
        </div>
        <div class="mt-9 flex flex-wrap gap-3">
          <a href="#booking" class="btn-primary"><CalendarDays :size="19" /> Đặt lịch ngay</a>
          <a href="#services" class="btn-ghost">Xem dịch vụ <ArrowDown :size="18" /></a>
        </div>
      </div>
    </div>
  </section>
</template>
