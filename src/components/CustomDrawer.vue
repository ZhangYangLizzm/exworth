<template>
  <Teleport :to="getContainer">
    <transition name="slide-grow">
      <div
        class="custom-drawer"
        v-if="visible"
        :class="[visible ? 'flex-grow' : 'flex-grow-0']"
      >
        <div class="relative flex-grow">
          <div class="drawer-header">
            <slot name="header"> Header</slot>
          </div>
          <div class="drawer-content">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<script lang="ts" setup>
defineProps({
  visible: Boolean,
  getContainer: {
    type: String,
    default: () => "body",
  },
});
</script>
<style scoped lang="less"></style>
