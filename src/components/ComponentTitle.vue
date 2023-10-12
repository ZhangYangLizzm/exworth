<script setup lang="ts">
defineProps<{
  title:string
}>()
</script>

<template>
  <div class="flex items-center font-medium flex-wrap gap-4 py-4">
    <div class="component-title text-lg">
      <span>
        {{ title }}
      </span>
    </div>
    <div class="flex justify-end">
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
    height: 100%;
    width: 2px;
    left: 0;
    bottom: 0;
    background-color: rgb(220, 223, 226);
  }
}
</style>
