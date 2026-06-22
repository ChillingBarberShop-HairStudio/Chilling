<script setup lang="ts">
import { Clock3 } from 'lucide-vue-next'
import { TIME_SLOTS } from '../../data/timeSlots'

defineProps<{
  modelValue: string
  disabledSlots?: readonly string[]
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <fieldset>
    <legend class="field-label flex items-center gap-2"><Clock3 :size="17" /> Chọn khung giờ dịch vụ <span>*</span></legend>
    <p class="mb-4 text-xs text-muted">Giờ mở cửa 09:00 - 20:00. Chọn thời gian phù hợp với bạn.</p>
    <div class="grid grid-cols-3 gap-2 sm:grid-cols-4">
      <button
        v-for="slot in TIME_SLOTS"
        :key="slot"
        type="button"
        class="slot-button"
        :class="{ 'slot-button--active': modelValue === slot }"
        :disabled="disabledSlots?.includes(slot)"
        :aria-pressed="modelValue === slot"
        @click="emit('update:modelValue', slot)"
      >
        {{ slot }}
      </button>
    </div>
  </fieldset>
</template>
