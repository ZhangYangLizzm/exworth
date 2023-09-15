<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" :color="color"></use>
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: 'svg',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: undefined
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>