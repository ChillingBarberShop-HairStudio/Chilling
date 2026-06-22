<script setup lang="ts">
import BarberPoleStrip from '../ui/BarberPoleStrip.vue'

const baseUrl = import.meta.env.BASE_URL
const samples = Array.from({ length: 10 }, (_, index) => ({
  src: `${baseUrl}sample/sample ${index + 1}.PNG`,
  alt: `Mẫu tóc hoàn thiện ${index + 1} tại Chilling Barber Shop`,
}))
</script>

<template>
  <section class="section-pad relative overflow-hidden bg-[#efede8]">
    <BarberPoleStrip />
    <div class="page-shell">
      <div class="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" data-reveal="left">
        <div>
          <p class="eyebrow">Chilling lookbook</p>
          <h2 class="section-title">Tác phẩm hoàn thiện</h2>
        </div>
        <p class="max-w-md text-sm leading-6 text-muted">Một số phong cách tóc và trải nghiệm hoàn thiện tại Chilling Barber Shop.</p>
      </div>
      <div class="gallery-grid mt-12">
        <figure v-for="(sample, index) in samples" :key="sample.src" class="gallery-item" :class="{ 'sm:row-span-2': index === 0 || index === 5 }" data-reveal>
          <img :src="sample.src" :alt="sample.alt" class="h-full w-full object-cover transition duration-500 hover:scale-[1.04]" loading="lazy" />
          <figcaption class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10 text-xs font-bold uppercase tracking-widest text-white opacity-0 transition group-hover:opacity-100">Chilling cut · {{ String(index + 1).padStart(2, '0') }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
