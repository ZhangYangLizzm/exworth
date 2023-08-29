<script setup>
import { useAppStore } from "@/stores/modules/app.js";
import { SUPPORT_LOCALES, SUPPORT_LOCALES_MAP } from "@/plugins/i18n";
import { map } from "lodash-es";
import { useUserStore } from "@/stores/modules/user.js";
import useClipboard from "@/hooks/useClipboard.js";
const userStore = useUserStore();
const appStore = useAppStore();
const localeList = computed(() =>
  map(SUPPORT_LOCALES_MAP, (label, value) => ({ label, value }))
);

const { copy } = useClipboard();
const handleLocaleSelect = ({ key }) => {
  appStore.setLocale(key);
  window.location.reload();
};

const handleMenuClick = ({ key }) => {
  switch (key) {
    case "Logout":
      userStore.logout();
      break;
    case "UID":
      copy(userStore.uid);
      break;
    default:
      break;
  }
};
</script>
<template>
  <a-layout-header class="bg-transparent absolute z-10 w-full !px-4">
    <div class="flex justify-between">
      <div>
        <router-view v-slot="{ Component }" name="header-extra">
          <component :is="Component"></component>
        </router-view>
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
              <a-menu-item
                v-for="locale in localeList"
                :key="locale.value"
                :disabled="appStore.locale === locale.value"
              >
                {{ locale.label }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <a-dropdown>
          <a-button type="text">
            <span>{{ userStore.accountName }} </span>
            <down-outlined />
          </a-button>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="UID">
                {{ $t("C8e-GonL-voVt9790n5Dw") }} : {{ userStore.uid }}
              </a-menu-item>
              <a-menu-item key="Logout">
                <template #icon>
                  <logout-outlined />
                </template>
                {{ $t("6b77_1yTm-gggQW0eZnOy") }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>
