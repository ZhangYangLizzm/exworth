<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="p-4 shadow rounded">
    <div class="flex items-center justify-between">
      <h3>{{ title }}</h3>
      <slot name="action"> </slot>
    </div>
    <div>
      <slot> </slot>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
