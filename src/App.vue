<script setup lang="ts">
import dayjs from "dayjs";
const { messages, locale } = useI18n();
const antLocale = computed(() => unref(messages)?.[unref(locale)]?.antLocale);
const configProvider = computed(() => ({
  locale: antLocale.value,
  autoInsertSpaseInButton: false,
}));

watch(antLocale, (newVal:any) => dayjs.locale(newVal.locale), { immediate: true });
</script>

<template>
  <a-config-provider v-bind="configProvider">
    <a-layout
      class="min-w-[75vw] max-w-[75vw] h-3/4 bg-white rounded-xl shadow flex"
    >
      <router-view v-slot="{ Component }">
        <Transition name="slide-page">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </a-layout>
  </a-config-provider>
</template>
