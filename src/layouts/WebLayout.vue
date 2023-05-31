<script setup>
import Logo from '@/libs/components/logo'
import WebHeader from './web/WebHeader.vue'

const route = useRoute()
const router = useRouter()
const selectedKeys = computed(() => [ ...route.matched.map(i => i.name) ])
</script>
<template>
  <a-layout class="min-h-screen !bg-white">
    <a-layout-sider v-if="!route.meta.hideSider">
      <div class="p-4 ">
        <Logo class="w-full bg-gray-700 rounded px-4 pt-2 pb-1" />
      </div>
      <div class="px-4">
        <a-menu
          theme="dark"
          mode="inline"
          @click="({ key }) => router.push({ name: key })"
          :selectedKeys="selectedKeys"
        >
          <a-menu-item key="Dashboard">
            <template #icon>
              <home-outlined />
            </template>
            首頁
          </a-menu-item>

          <a-menu-item key="Wallet">
            <template #icon>
              <wallet-outlined />
            </template>
            錢包
          </a-menu-item>

          <a-menu-item key="Card">
            <template #icon>
              <credit-card-outlined />
            </template>
            發卡
          </a-menu-item>

          <a-menu-item key="Setting">
            <template #icon>
              <setting-outlined />
            </template>
            設置
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout class="!bg-transparent">
      <WebHeader></WebHeader>
      <a-layout-content class="!bg-transparent">
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>