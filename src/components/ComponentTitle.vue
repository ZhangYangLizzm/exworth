<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center mb-4 text-lg">
    <div class="leading-none text-primary flex-grow title-text">
      {{ props.text }}
    </div>
    <div class="flex items-center">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.title-text {
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
