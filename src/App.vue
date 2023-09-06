<template>
  <div class="w-3/4 h-3/4 bg-white rounded-xl shadow flex">
    <div class="w-[200px] h-full left-siderbar p-4">LeftSidegbar</div>
    <div class="layout-content w-full flex rounded-r-xl" id="design-layout">
      <div class="flex-grow relative grow-transition bg-red-200 p-4">
        <AButton type="primary" @click="visible = !visible"> 抽屉</AButton>
      </div>
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

#design-layout:has(.custom-drawer) > div {
  flex-grow: 2;
}

.left-siderbar {
  border-right: 1px solid rgba(182, 178, 178, 0.392);
}
</style>
