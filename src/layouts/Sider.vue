<script setup lang="ts">
import { MenuClickEventHandler } from "ant-design-vue/es/menu/src/interface";

const router = useRouter();
const route = useRoute();

const selectedKeys = computed(() => [
  ...route.matched.map((i) => i.name as string),
]);

const handleMenuClick: MenuClickEventHandler = ({ key }) => {
  console.log(selectedKeys.value)
  router.push({ name: key as string });
};
</script>

<template>
  <ALayoutSider theme="light" class="p-4">
    <div class="px-4 pb-4">
      <Logo dark />
    </div>

    <AMenu :selectedKeys="selectedKeys" @click="handleMenuClick" mode="inline" :openKeys="['MerchantMenuGroup']">
      <ASubMenu :title="$t('rPh_Y_AvyyfdFIXXKYs8k')" key="MerchantMenuGroup" >
        <template #icon>
          <ShopOutlined />
        </template>
        <AMenuItem class="rounded" key="MerchantList">
          {{ $t("rPh_Y_AvyyfdFIXXKYs8k") }}
        </AMenuItem>

        <AMenuItem class="rounded" key="MerchantGroup">
          {{ $t("-1RJ8nk84Eni_BuafILFH") }}
        </AMenuItem>
      </ASubMenu>

      <AMenuItem class="rounded" key="User">
        <template #icon>
          <user-outlined />
        </template>
        {{ $t("juOW83X8TPVqJ3Lt0AW52") }}
      </AMenuItem>

      <AMenuItem class="rounded" key="Channel">
        <template #icon>
          <ApartmentOutlined />
        </template>
        {{ $t("OzIoCczrTnz7cplb0PsRa") }}
      </AMenuItem>
    </AMenu>
  </ALayoutSider>
</template>


<style scoped>
/* :deep(.ant-menu-root){
  border: none !important;;
} */
</style>