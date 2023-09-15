<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center mb-4 text-lg h-8">
    <div class="leading-none text-primary flex-grow component-title">
      {{ title }}
    </div>
    <div class="flex items-center">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.component-title {
  position: relative;
  padding-left: 8px;
  
  &:before {
    position: absolute;
    content: "";
    width: 2px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgb(209 213 219);
  }
}
</style>
