<script setup>
import SvgIcon from '@/libs/components/svgIcon'
import Header from '@/libs/components/layouts/Header.vue'
import AppMenu from '@/libs/components/layouts/HeaderMenu.vue'
import ListModal from '@/libs/components/antd/modal/ListModal.vue'
import { useAppStore } from '@/libs/stores/modules/app'
import { SUPPORT_LOCALES_MAP } from '@/plugins/i18n'
import { map } from 'lodash-es'
import { useMenu } from '@/stores/useMenu'

const appStore = useAppStore()

const localeModalRef = ref()
const localeList = computed(() => map(SUPPORT_LOCALES_MAP, ((label, value) => ({ label, value }))))
const onLocaleChange = (locale) => {
  appStore.setLocale(locale)
  window.location.reload()
}

const scanSrc = '/staticcdn/exstatic/pro/download/app.png'

const { app } = useMenu()
const appMenus = computed(() => [].concat(app))
const uid = ref('')
</script>
<template>
  <a-layout class="ex-view">
    <Header
      :isMobile="appStore.isMobile"
    >
      <AppMenu
        :theme="uid ? 'dark' : 'light'"
        mode="horizontal"
        :menus="appMenus"
        class="left-menu"
        v-if="!appStore.isMobile" 
      >
      </AppMenu>
      <template #settings>
        <div class="flex items-center">
          <a-button type="link"
            @click="localeModalRef?.show()"
          >
            <GlobalOutlined class="text-[18px]" />
          </a-button>
        </div>
      </template>
    </Header>
    <a-layout-content>
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </a-layout-content>
  </a-layout>
</template>