<script setup lang="ts">
import { CalendarCheck2, Droplets, ReceiptText, Scissors, Sparkles, Waves } from 'lucide-vue-next'
import BarberPoleStrip from '../ui/BarberPoleStrip.vue'

const baseUrl = import.meta.env.BASE_URL
const styleCards = [
  { src: `${baseUrl}Form/IVY LEAGUE.jpg`, title: 'Ivy League', text: 'Gọn gàng, lịch sự và linh hoạt.' },
  { src: `${baseUrl}Form/SIDE PART.jpg`, title: 'Side Part', text: 'Chỉn chu, nam tính và dễ tạo kiểu.' },
  { src: `${baseUrl}Form/UNDER CUT.jpg`, title: 'Undercut', text: 'Sắc nét, hiện đại và mạnh mẽ.' },
]

const highlights = [
  { icon: Scissors, title: 'Cắt tóc chuyên nghiệp', text: 'Tạo phom kỹ lưỡng, tư vấn kiểu tóc hợp gương mặt và phong cách.' },
  { icon: Waves, title: 'Uốn, ép side, nhuộm', text: 'Kỹ thuật hiện đại, giúp mái tóc có độ bền và vẻ tự nhiên.' },
  { icon: Droplets, title: 'Dịch vụ thư giãn', text: 'Gội đầu và massage giúp bạn thư thái sau một ngày dài.' },
  { icon: Sparkles, title: 'Chăm sóc riêng lẻ', text: 'Các bước chăm sóc diện mạo nhỏ nhưng tạo nên khác biệt lớn.' },
  { icon: CalendarCheck2, title: 'Đặt lịch nhanh', text: 'Chọn dịch vụ, barber và giờ phù hợp chỉ trong vài phút.' },
  { icon: ReceiptText, title: 'Chi phí rõ ràng', text: 'Theo dõi giá và thời gian dự kiến ngay khi lựa chọn dịch vụ.' },
]
</script>

<template>
  <section id="services" class="section-pad relative overflow-hidden bg-ink text-white">
    <BarberPoleStrip />
    <div class="page-shell">
      <div class="max-w-3xl" data-reveal="right">
        <p class="eyebrow">Dịch vụ và mẫu tóc</p>
        <h2 class="section-title text-white">Chọn kiểu phù hợp<br />Trọn vẹn phong cách</h2>
      </div>

      <div class="style-card-grid mt-12">
        <figure v-for="(style, index) in styleCards" :key="style.src" class="style-card" data-reveal :style="{ transitionDelay: `${index * 80}ms` }">
          <img :src="style.src" :alt="`Mẫu tóc ${style.title}`" loading="lazy" />
          <figcaption>
            <h3>{{ style.title }}</h3>
            <p>{{ style.text }}</p>
          </figcaption>
        </figure>
      </div>

      <div class="mt-5 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
        <article v-for="item in highlights" :key="item.title" class="group bg-[#191815] p-7 transition hover:bg-[#22201c] sm:p-8">
          <component :is="item.icon" :size="30" :stroke-width="1.6" class="text-gold transition group-hover:-translate-y-1" />
          <h3 class="mt-7 text-lg font-bold">{{ item.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-stone-400">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
