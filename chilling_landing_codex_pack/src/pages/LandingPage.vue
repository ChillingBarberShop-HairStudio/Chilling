<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted } from 'vue'
import AppFooter from '../components/layout/AppFooter.vue'
import AppHeader from '../components/layout/AppHeader.vue'
import HeroSection from '../components/landing/HeroSection.vue'
import StudioShowcase from '../components/landing/StudioShowcase.vue'
import ServiceHighlights from '../components/landing/ServiceHighlights.vue'
import SampleGallery from '../components/landing/SampleGallery.vue'
import BookingSection from '../components/landing/BookingSection.vue'
import { initScrollReveal } from '../utils/reveal'

let cleanupReveal: () => void = () => {}
onMounted(async () => {
  await nextTick()
  cleanupReveal = initScrollReveal()
})
onBeforeUnmount(() => cleanupReveal())
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection />
    <StudioShowcase />
    <ServiceHighlights />
    <SampleGallery />
    <BookingSection />
  </main>
  <AppFooter />
</template>
