<script setup lang="ts">
import { useDrawerInject } from "@/hooks/useDrawer.ts";

defineProps({
  getContainer: {
    type: String,
    default: "#ex-drawer",
  },
  title: {
    type: String,
    default: "Title",
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
});

const { drawerVisible, closeDrawer } = useDrawerInject();

const emit = defineEmits(["afterClose"]);
const onCloseDrawer = () => {
  closeDrawer();
  emit("afterClose");
};
</script>

<template>
  <Teleport :to="getContainer" v-if="drawerVisible">
    <div class="h-full absolute shadow rounded-r-xl overflow-hidden">
      <div
        class="drawer-header flex w-full h-12 justify-center items-center py-4"
        v-if="showTitle"
      >
        <close-outlined
          @click="onCloseDrawer"
          class="ml-2 cursor-pointer hover:text-primary"
        />
        <div class="flex-grow text-center">
          <slot name="header">
            <div class="font-bold text-base tracking-wide">
              {{ title }}
            </div>
          </slot>
        </div>
      </div>
      <div class="p-2 overflow-y-auto h-full">
        <Transition name="slide-page" mode="out-in">
          <slot> </slot>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="less">
.drawer-header {
  border-bottom: 1px solid #e8e8e8;
}
</style>
