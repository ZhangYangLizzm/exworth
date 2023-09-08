<script setup>
import { useAppStore } from "@/libs/stores/modules/app";
const appStore = useAppStore();
defineProps({
  functions: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div
    class="flex items-center gap-x-4"
    :class="[!appStore.isMobile ? 'justify-center' : '']"
  >
    <span>
      <swap-outlined
        :class="[functions?.transfer ? 'text-primary' : 'text-gray-400']"
      />

      {{ $t("pGrhTXj8A84ieJpHf6k3L") }}</span
    >
    <span>
      <credit-card-filled
        :class="[functions?.ppc ? 'text-primary' : 'text-gray-400']"
      />

      {{ $t("OnPSpwMATKuG2io4jQP3a") }}
    </span>

    <span>
      <credit-card-outlined
        :class="[functions.vcc ? 'text-primary' : 'text-gray-400']"
      />
      {{ $t("S2OrYOKW-4S0okv_ixAu-") }}
    </span>
  </div>
</template>

<style scoped lang="less"></style>
