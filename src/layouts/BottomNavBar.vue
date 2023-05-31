<script setup>
const route = useRoute()
const router = useRouter()
const selectedKeys = computed(() => [ ...route.matched.map(i => i.name) ])
</script>
<template>
  <Transition name="slide-down">
    <div
      class="fixed z-10 bottom-0 w-full bg-black text-gray-400 py-2"
      v-if="!route.meta.hideBottom"
    >
      <div class="grid grid-cols-4 text-center">
        <div
          :class="{ 'text-white': selectedKeys.includes('Dashboard') }"
          @click="router.push({ name: 'Dashboard' })"
        >
          <div class="icon">
            <home-outlined class="text-xl" />
          </div>
          首頁
        </div>

        <div
          :class="{ 'text-white': selectedKeys.includes('Wallet') }"
          @click="router.push({ name: 'Wallet' })"
        >
          <div class="icon">
            <wallet-outlined class="text-xl" />
          </div>
          錢包
        </div>

        <div
          :class="{ 'text-white': selectedKeys.includes('Card') }"
          @click="router.push({ name: 'Card' })"
        >
          <div class="icon">
            <credit-card-outlined class="text-xl" />
          </div>
          發卡
        </div>

        <div
          :class="{ 'text-white': selectedKeys.includes('Setting') }"
          @click="router.push({ name: 'Setting' })"
        >
          <div class="icon">
            <setting-outlined class="text-xl" />
          </div>
          我的
        </div>
      </div>
    </div>
  </Transition>
</template>