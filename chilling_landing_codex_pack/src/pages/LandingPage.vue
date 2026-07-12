<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import AppFooter from '../components/layout/AppFooter.vue'
import AppHeader from '../components/layout/AppHeader.vue'
import HeroSection from '../components/landing/HeroSection.vue'
import StudioShowcase from '../components/landing/StudioShowcase.vue'
import ServiceHighlights from '../components/landing/ServiceHighlights.vue'
import SampleGallery from '../components/landing/SampleGallery.vue'
import BookingSection from '../components/landing/BookingSection.vue'
import { initScrollReveal } from '../utils/reveal'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

type LandingMedia = { id: string; section_key: 'hero' | 'studio' | 'services' | 'gallery'; storage_path: string; alt_text: string; sort_order: number }
const content = ref<Record<string, Record<string, string>>>({})
const media = ref<LandingMedia[]>([])
const sectionImages = (section: LandingMedia['section_key']) => media.value.filter((item) => item.section_key === section).map((item) => ({
  src: item.storage_path.startsWith('http') ? item.storage_path : supabase!.storage.from('landing-media').getPublicUrl(item.storage_path).data.publicUrl,
  alt: item.alt_text,
}))

async function loadLandingContent() {
  if (!isSupabaseConfigured || !supabase) return
  const [contentResult, mediaResult] = await Promise.all([
    supabase.from('landing_content').select('content_key, content_value').eq('is_public', true),
    supabase.from('landing_media').select('id, section_key, storage_path, alt_text, sort_order').eq('is_active', true).order('section_key').order('sort_order').order('created_at'),
  ])
  if (!contentResult.error && contentResult.data) {
    content.value = Object.fromEntries(contentResult.data.map((row) => [row.content_key, row.content_value as Record<string, string>]))
  }
  if (!mediaResult.error && mediaResult.data) media.value = mediaResult.data as LandingMedia[]
}

let cleanupReveal: () => void = () => {}
onMounted(async () => {
  await loadLandingContent()
  await nextTick()
  cleanupReveal = initScrollReveal()
})
onBeforeUnmount(() => cleanupReveal())
</script>

<template>
  <AppHeader />
  <main>
    <HeroSection :content="content.hero" :image="sectionImages('hero')[0]?.src" />
    <StudioShowcase :content="content.studio" :images="sectionImages('studio')" />
    <ServiceHighlights :content="content.services" :images="sectionImages('services')" />
    <SampleGallery :content="content.gallery" :samples="sectionImages('gallery')" />
    <BookingSection />
  </main>
  <AppFooter />
</template>
