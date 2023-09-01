<script setup>
import Logo from "@/libs/components/logo";
import WebHeader from "./web/WebHeader.vue";

const route = useRoute();
const router = useRouter();
const selectedKeys = computed(() => [...route.matched.map((i) => i.name)]);
const handleMenuClick = ({ key }) => {
  if (key === "Member") {
    router.push({ name: "MemberList" }); // 切换到 MemberList 路由
  } else if (key === "Wallet") {
    router.push({ name: "AccountDetails" });
  } else {
    router.push({ name: key });
  }
};
</script>
<template>
  <a-layout class="min-h-screen">
    <a-layout-sider v-if="!route.meta.hideSider">
      <div class="p-4">
        <Logo class="w-full px-4 pt-2 pb-1 bg-gray-700 rounded" />
      </div>
      <div class="px-4">
        <a-menu theme="dark" mode="inline" @click="handleMenuClick" :selectedKeys="selectedKeys">
          <a-menu-item class="rounded" key="Wallet">
            <template #icon>
              <wallet-outlined />
            </template>
            {{ $t("JMrHbl_ei1CFmRIw8N60f") }}
          </a-menu-item>

          <a-menu-item class="rounded" key="Member">
            <template #icon>
              <user-outlined />
            </template>
            {{ $t("DJA8mXTnjyyt6SpiAbvhO") }}
          </a-menu-item>

          <!-- <a-menu-item class="rounded" key="Card">
            <template #icon>
              <credit-card-outlined />
            </template>
            {{ $t("c9v0NvMxo7MffTy-TXDir") }}
          </a-menu-item> -->

          <a-menu-item class="rounded" key="Setting">
            <template #icon>
              <setting-outlined />
            </template>
            {{ $t("tn1dw0_d4hpGoJZiMaCjB") }}
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout class="!bg-transparent relative max-h-[100vh] overflow-y-auto !bg-white">
      <WebHeader></WebHeader>
      <a-layout-content class="!bg-transparent pt-16">
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
