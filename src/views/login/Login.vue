<script setup>
import Header from '@/libs/components/layouts/Header.vue'
import Logo from '@/libs/components/logo'
import { SUPPORT_LOCALES_MAP } from '@/plugins/i18n'
import { useAppStore } from '@/libs/stores/modules/app'
import LoginForm from './LoginForm.vue'

const thisYear = computed(() => dayjs().year())

const appStore = useAppStore()

const handleLocaleClick = ({ key }) => {
  appStore.setLocale(key)
  window.location.reload()
}
</script>
<template>
  <a-layout class="login">
    <Header class="!bg-transparent fixed w-full top-0">
      <template #settings>
        <a-dropdown>
          <a>{{ appStore.localeText }}</a>
          <template #overlay>
            <a-menu @click="handleLocaleClick">
              <a-menu-item
                v-for="(item, key) in SUPPORT_LOCALES_MAP"
                :key="key"
              >
                {{ item }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </Header>
    <a-layout-content class="bg-transparent">
      <div class="mx-auto w-11/12">
        <div class="mx-auto max-w-[215px] mt-40 mb-10">
          <Logo dark />
        </div>
        <div class="text-center text-lg">{{ $t('uRZHmMHGIbHs9TMJtbzT6') }}</div>
        <div class="mt-20">
          <LoginForm />
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer class="bg-transparent text-center fixed w-full bottom-0 text-gray-300">
      Copyright © 2017-{{ thisYear }} PPC
    </a-layout-footer>
  </a-layout>
</template>

<style lang="less" scoped>
.login {
  min-height: 100vh;
  background-image: url('/images/login/bg_pc.png');
  background-size: contain;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-color: #fff;
}
</style>