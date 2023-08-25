<script setup>
import { useAppStore } from "@/stores/modules/app.js";
import { SUPPORT_LOCALES, SUPPORT_LOCALES_MAP } from "@/plugins/i18n";
import { map } from "lodash-es";
import { useUserStore } from "@/stores/modules/user.js";
import Logo from "@/libs/components/logo";

const userStore = useUserStore();
const appStore = useAppStore();
const localeList = computed(() =>
  map(SUPPORT_LOCALES_MAP, (label, value) => ({ label, value }))
);

const handleLocaleSelect = ({ key }) => {
  appStore.setLocale(key);
  window.location.reload();
};
const handleMenuClick = ({ key }) => {
  if (key === "Logout") {
    userStore.logout();
  } else if (key === "Member") {
    router.push({ name: "MemberList" }); // 切换到 MemberList 路由
  } else if (key === "Wallet") {
    router.push({ name: "AccountDetails" });
  } else {
    router.push({ name: key });
  }
  visible.value = false;
};
const route = useRoute();
const router = useRouter();
const selectedKeys = computed(() => [...route.matched.map((i) => i.name)]);

const visible = ref(false);
</script>
<template>
  <a-layout-header class="bg-transparent z-10 w-full !px-4" :class="[route.meta?.headerExtra ? 'h-32' : '']">
    <div class="flex justify-between">
      <div class="grow">
        <Logo width="8em" dark="false" />
      </div>
      <div>
        <a-dropdown placement="bottom">
          <a-button type="text">
            {{ appStore.localeText }}
            <template #icon>
              <global-outlined />
            </template>
          </a-button>
          <template #overlay>
            <a-menu @click="handleLocaleSelect">
              <a-menu-item v-for="locale in localeList" :key="locale.value" :disabled="appStore.locale === locale.value">
                {{ locale.label }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <menu-fold-outlined @click="visible = true" />
        <a-drawer v-model:visible="visible" width="100%" :closable="false" @close="visible = false">
          <template #title>
            <Logo width="8em" dark="false" />
          </template>
          <template #extra>
            <close-outlined @click="visible = false" />
          </template>
          <a-menu @click="handleMenuClick" :selectedKeys="selectedKeys">
            <a-menu-item key="Wallet">
              <template #icon>
                <wallet-outlined />
              </template>
              錢包
            </a-menu-item>
            <a-menu-item key="Member">
              <template #icon>
                <user-outlined />
              </template>
              成員
            </a-menu-item>
            <!-- <a-menu-item key="Card">
              <template #icon>
                <credit-card-outlined />
              </template>
              卡管理
            </a-menu-item> -->
            <a-menu-item key="Setting">
              <template #icon>
                <setting-outlined />
              </template>
              設置
            </a-menu-item>
            <a-menu-item key="Logout">
              <template #icon>
                <logout-outlined />
              </template>
              退出登陸
            </a-menu-item>
          </a-menu>
        </a-drawer>
      </div>
    </div>
    <router-view v-slot="{ Component }" name="header-extra">
      <component :is="Component"></component>
    </router-view>
  </a-layout-header>
</template>
