<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Facebook, MapPin, Phone } from 'lucide-vue-next'
import { BRANCH } from '../../data/branchData'

const scrolled = ref(false)
const baseUrl = import.meta.env.BASE_URL
const onScroll = () => { scrolled.value = window.scrollY > 16 }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="site-header" :class="{ 'site-header--scrolled': scrolled }">
    <div class="page-shell flex h-[76px] items-center justify-between gap-4 lg:h-[88px]">
      <a href="#top" class="flex shrink-0 items-center gap-3" aria-label="Về đầu trang">
        <img :src="`${baseUrl}logo.PNG`" alt="Chilling Barber Shop" class="h-12 w-12 rounded-full object-cover ring-1 ring-black/10 lg:h-14 lg:w-14" />
        <span class="hidden text-sm font-black uppercase tracking-[0.18em] text-stone-900 sm:block">
          Chilling<br /><span class="text-[10px] tracking-[0.32em] text-gold">Barber Shop</span>
        </span>
      </a>

      <div class="pole-panel hidden md:block" aria-hidden="true">
        <img :src="`${baseUrl}panel.PNG`" alt="" />
      </div>

      <div class="flex items-center gap-2">
        <a :href="BRANCH.phoneLink" class="header-action" aria-label="Gọi 032 796 9930">
          <Phone :size="18" />
          <span class="hidden lg:inline">{{ BRANCH.phone }}</span>
        </a>
        <a :href="BRANCH.mapUrl" target="_blank" rel="noreferrer" class="header-action" aria-label="Xem địa chỉ trên Google Maps">
          <MapPin :size="18" />
          <span class="hidden max-w-48 truncate xl:inline">{{ BRANCH.displayAddress }}</span>
        </a>
        <a :href="BRANCH.facebookUrl" target="_blank" rel="noreferrer" class="header-action" aria-label="Facebook Chilling Barber Shop">
          <Facebook :size="18" />
        </a>
      </div>
    </div>
  </header>
</template>
