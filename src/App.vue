<script setup lang="ts">
import dayjs from "dayjs";
const { messages, locale } = useI18n();
const antLocale = computed(() => unref(messages)?.[unref(locale)]?.antLocale);

watch(antLocale, (newVal: any) => dayjs.locale(newVal.locale), {
  immediate: true,
});
</script>

<template>
  <a-config-provider :locale="antLocale" :autoInserSpaceInButton="false">
    <a-layout
      class="rounded-xl shadow flex min-w-[75vw] max-w-[75vw] h-[75vh] bg-white relative"
    >
      <router-view v-slot="{ Component }">
        <Transition name="slide-page">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </a-layout>
  </a-config-provider>
</template>
