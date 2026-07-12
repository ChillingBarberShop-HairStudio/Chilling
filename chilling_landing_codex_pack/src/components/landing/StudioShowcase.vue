<script setup lang="ts">
import { computed } from 'vue'
import BarberPoleStrip from '../ui/BarberPoleStrip.vue'

const baseUrl = import.meta.env.BASE_URL
const props = defineProps<{ content?: Record<string, string>; images?: Array<{ src: string; alt: string }> }>()
const fallbackImages = [
  { src: `${baseUrl}landing/anh2.PNG`, alt: 'Không gian Chilling Barber Shop', featured: true },
  { src: `${baseUrl}landing/anh2-1.PNG`, alt: 'Barber tạo kiểu tóc tại Chilling' },
  { src: `${baseUrl}landing/anh2-2.jpg`, alt: 'Chi tiết dịch vụ tóc chuyên nghiệp' },
  { src: `${baseUrl}landing/anh2-3.PNG`, alt: 'Trải nghiệm tại Chilling Barber Shop' },
  { src: `${baseUrl}landing/anh2-4.PNG`, alt: 'Không gian phục vụ khách hàng' },
  { src: `${baseUrl}landing/anh2-5.PNG`, alt: 'Thành phẩm tóc tại Chilling' },
  { src: `${baseUrl}landing/anh2-7.jpg`, alt: 'Barber đang hoàn thiện kiểu tóc cho khách' },
  { src: `${baseUrl}landing/anh2-8.jpg`, alt: 'Bộ dụng cụ chuyên nghiệp tại Chilling' },
  { src: `${baseUrl}landing/anh2-9.jpg`, alt: 'Ghế cắt và không gian studio Chilling' },
]
const images = computed(() => props.images?.length ? props.images.map((image, index) => ({ ...image, featured: index === 0 })) : fallbackImages)
</script>

<template>
  <section class="section-pad relative overflow-hidden bg-warm-white">
    <BarberPoleStrip />
    <div class="page-shell">
      <div class="mb-12 grid gap-7 lg:grid-cols-[.75fr_1.25fr] lg:items-end" data-reveal="left">
        <div>
          <p class="eyebrow">{{ content?.eyebrow || 'Không gian & tay nghề' }}</p>
          <h2 class="section-title">{{ content?.titleLineOne || 'Barber studio' }}<br />{{ content?.titleLineTwo || 'đúng chất của bạn' }}</h2>
        </div>
        <div class="max-w-xl lg:justify-self-end">
          <p class="text-base leading-7 text-muted">{{ content?.description || 'Từ tư vấn kiểu tóc phù hợp khuôn mặt đến kỹ thuật hoàn thiện, mỗi dịch vụ đều rõ giá, rõ thời gian và được thực hiện với sự tập trung cao nhất.' }}</p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span class="pill">Tư vấn tận tâm</span><span class="pill">Giá minh bạch</span><span class="pill">Không gian thoải mái</span>
          </div>
        </div>
      </div>

      <div class="showcase-grid">
        <figure v-for="(image, index) in images" :key="image.src" class="showcase-image" :class="{ 'showcase-image--featured': image.featured }" data-reveal :style="{ transitionDelay: `${Math.min(index * 60, 240)}ms` }">
          <img :src="image.src" :alt="image.alt" class="h-full w-full object-cover transition duration-700 hover:scale-[1.03]" loading="lazy" />
        </figure>
      </div>
    </div>
  </section>
</template>
