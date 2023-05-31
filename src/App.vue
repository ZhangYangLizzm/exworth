<script setup>
import i18n from '@/plugins/i18n'
const antLocale = computed(() => i18n.messages?.[locale.value]?.antLocale)
const configProvider = computed(() => ({
  locale: antLocale.value,
  autoInsertSpaseInButton: false,
}))
watch(antLocale, val => dayjs.locale(val.locale))

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
