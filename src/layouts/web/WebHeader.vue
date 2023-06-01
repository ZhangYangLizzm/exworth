<script setup>
import { useAppStore } from '@/stores/modules/app.js'
import { SUPPORT_LOCALES, SUPPORT_LOCALES_MAP } from '@/plugins/i18n'
import { map } from 'lodash-es'
import { useUserStore } from '@/stores/modules/user.js'

const userStore = useUserStore()
const appStore = useAppStore()
const localeList = computed(() => map(SUPPORT_LOCALES_MAP, ((label, value) => ({ label, value }))))

const handleLocaleSelect = ({ key }) => {
  appStore.setLocale(key)
  window.location.reload()
}

const handleMenuClick = ({ key }) => {
  switch (key) {
    case 'Logout':
      userStore.logout()
      break;
  
    default:
      break;
  }
}
</script>
<template>
  <a-layout-header class="bg-transparent absolute z-10 w-full">
    <div class="flex justify-between">
      <div class=""></div>
      <div class="">
        <a-dropdown
          placement="bottom"
        >
          <a-button type="text">
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
            <span>{{ userStore.username }}</span>
            <down-outlined />
          </a-button>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="Logout">
                <template #icon>
                  <logout-outlined />
                </template>
                退出登錄
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>