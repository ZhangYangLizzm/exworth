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
        <Logo class="w-full px-4 pt-2 pb-1 bg-gray-700 rounded" />
      </div>
      <div class="px-4">
        <a-menu
          theme="dark"
          mode="inline"
          @click="({ key }) => router.push({ name: key })"
          :selectedKeys="selectedKeys"
        >
          <a-menu-item class="rounded" key="Dashboard">
            <template #icon>
              <home-outlined />
            </template>
            首頁
          </a-menu-item>

          <a-menu-item class="rounded" key="Wallet">
            <template #icon>
              <wallet-outlined />
            </template>
            錢包
          </a-menu-item>

          <a-menu-item class="rounded" key="Card">
            <template #icon>
              <credit-card-outlined />
            </template>
            發卡
          </a-menu-item>

          <a-menu-item class="rounded" key="Setting">
            <template #icon>
              <setting-outlined />
            </template>
            設置
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout class="!bg-transparent relative">
      <WebHeader></WebHeader>
      <a-layout-content class="!bg-transparent pt-16">
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>