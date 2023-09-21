<script setup lang="ts">
import { Locale } from "ant-design-vue/es/locale";
import dayjs from "dayjs";
import { useAppStore } from "@/stores/app";

const { messages, locale } = useI18n();
const antLocale = computed(
  () => unref(messages)?.[unref(locale)]?.antLocale
) as ComputedRef<Locale>;

const theme = {
  token: {
    colorPrimary: "#0cbf53",
  },
};

watch(antLocale, (newVal: any) => dayjs.locale(newVal.locale), {
  immediate: true,
});

const appStore = useAppStore();
</script>

<template>
  <a-config-provider
    :locale="antLocale"
    :autoInserSpaceInButton="false"
    :theme="theme"
  >
    <a-layout
      class="shadow flex bg-[rgb(255,255,255,0.8)] relative overflow-hidden"
      :class="[
        appStore.isMonitor
          ? 'min-w-[80vw] max-w-[80vw] h-[80vh] rounded-xl'
          : 'w-full h-full',
      ]"
    >
      <router-view v-slot="{ Component }">
        <Transition name="slide-page">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </a-layout>
  </a-config-provider>
</template>
