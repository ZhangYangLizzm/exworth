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
  <div class="py-2" :class="{ divider }">
    <div class="text-base font-bold">
      {{ title }}
    </div>  

    <div class="text-[#00000073] w-3/4">
      <slot name="content" />
    </div>

    <div class="text-right">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.divider {
  border-bottom: 1px solid #e8e8e8;
}
</style>
