<script setup>
defineProps({
  title: String,
  divider: Boolean,
});
</script>

<template>
  <div class="flex p-2" :class="{ divider }">
    <div class="flex-grow">
      <p class="mb-2 text-base font-bold">
        {{ title }}
      </p>
      <slot name="content" />
    </div>
    <div>
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.divider {
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 0.5rem;
}
</style>
