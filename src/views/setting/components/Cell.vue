<script setup lang="ts">
defineProps({
  title: String,
  divider: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="py-2 setting-cell" :class="{ divider }">
    <div class="text-base font-bold">
      {{ title }}
    </div>

    <div class="text-[#00000073]">
      <slot name="content" />
    </div>

    <div class="text-right">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.setting-cell {
  background-color: var(--theme-active-color);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}
.divider {
  border-bottom: 1px solid var(--divider-gray);
}
</style>
