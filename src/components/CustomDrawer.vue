<template>
  <Teleport :to="getContainer">
    <transition name="slide-grow">
      <div
        class="custom-drawer rounded-r-xl"
        v-if="visible"
        :class="[visible ? 'flex-grow' : 'flex-grow-0']"
      >
        <div class="relative flex-grow">
          <div class="drawer-header p-4">
            <slot name="header"> Header</slot>
          </div>
          <div class="drawer-content p-4">
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
<style scoped>
.custom-drawer {
  border-left: 1px solid rgba(182, 178, 178, 0.392);
}

.drawer-header {
  border-bottom: 1px solid rgba(182, 178, 178, 0.392);
}
</style>
