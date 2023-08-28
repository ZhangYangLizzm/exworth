<script setup>
import dayjs from 'dayjs'
const { messages, locale } = useI18n()
const antLocale = computed(() => unref(messages)?.[unref(locale)]?.antLocale)
const configProvider = computed(() => ({
  locale: antLocale.value,
  autoInsertSpaseInButton: false,
}))

watch(antLocale, val => dayjs.locale(val.locale), { immediate: true })
</script>

<template>
  <a-config-provider v-bind="configProvider">
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </a-config-provider>
</template>

<style lang="less">
@import '@/libs/themes/global.less';
</style>
