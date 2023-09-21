<script setup lang="ts">
import { useDrawerInject, useDrawerTitle } from "@/hooks/useDrawer.ts";
import { useAppStore } from "@/stores/app";
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
const { Title } = useDrawerTitle();
const onCloseDrawer = () => {
  closeDrawer();
};

const appStore = useAppStore();
</script>

<template>
  <Teleport :to="getContainer" v-if="drawerVisible">
    <div
      class="h-full w-full absolute shadow rounded-r-xl overflow-hidden flex flex-col"
    >
      <div
        class="drawer-header flex w-full h-12 justify-center items-center py-4"
        v-if="showTitle"
      >
        <close-outlined
          @click="onCloseDrawer"
          class="cursor-pointer hover:text-primary"
          :class="[appStore.isMobile ? 'mr-4 order-1' : 'ml-2']"
        />
        <div
          class="flex-grow"
          :class="[appStore.isMobile ? 'ml-4' : 'text-center']"
        >
          <slot name="header">
            <div class="font-semibold text-base tracking-wide">
              {{ Title || title }}
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
