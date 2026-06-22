<script setup lang="ts">
import { Facebook, MapPin, Phone } from 'lucide-vue-next'
import { BRANCH } from '../../data/branchData'

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <footer class="bg-ink text-white">
    <div class="page-shell grid gap-8 py-12 md:grid-cols-[1fr_auto] md:items-end">
      <div>
        <img :src="`${baseUrl}logo.PNG`" alt="Chilling Barber Shop" class="mb-5 h-16 w-16 rounded-full bg-white object-cover" loading="lazy" />
        <h2 class="font-display text-2xl font-black uppercase tracking-wide">Chilling Barber Shop</h2>
        <p class="mt-2 max-w-xl text-sm leading-6 text-stone-400">Tận tâm trong từng đường kéo. Chỉn chu trong từng trải nghiệm.</p>
      </div>
      <div class="space-y-3 text-sm text-stone-300">
        <a :href="BRANCH.phoneLink" class="footer-link"><Phone :size="17" /> {{ BRANCH.phone }}</a>
        <a :href="BRANCH.mapUrl" target="_blank" rel="noreferrer" class="footer-link"><MapPin :size="17" /> {{ BRANCH.displayAddress }}</a>
        <a :href="BRANCH.facebookUrl" target="_blank" rel="noreferrer" class="footer-link"><Facebook :size="17" /> Facebook</a>
      </div>
    </div>
    <div class="border-t border-white/10 py-5 text-center text-xs text-stone-500">© 2026 Engineered by Vinh | All rights reserved</div>
  </footer>
</template>
