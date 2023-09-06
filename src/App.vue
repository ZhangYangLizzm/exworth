<template>
  <div class="w-3/4 h-3/4 bg-white rounded-xl shadow flex">
    <div class="w-[200px] h-full left-siderbar">
      <AButton type="primary" @click="visible = !visible" class="bg-purple-300">
        抽屉</AButton
      >
    </div>
    <div class="layout-content w-full flex" id="design-layout">
      <div class="flex-grow-[2] bg-red-100 relative"></div>
    </div>
  </div>

  <CustomDrawer :visible="visible" getContainer="#design-layout">
    <div>Content</div>
  </CustomDrawer>
</template>

<script lang="ts" setup>
const visible = ref(false);
const CustomDrawer = defineAsyncComponent(
  () => import("./components/CustomDrawer.vue")
);
</script>

<style scoped>
#design-layout {
  position: relative;
}
</style>
