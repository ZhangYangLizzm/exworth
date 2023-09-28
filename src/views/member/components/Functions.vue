<script setup lang="ts">
defineProps<{
  functions: {
    transfer: boolean;
    ppc: boolean;
    vcc: boolean;
  };
  isMobile: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-x-4">
    <span :class="[functions?.transfer ? 'text-primary' : 'text-gray-400']">
      <swap-outlined class="mr-1" />
      <span v-if="!isMobile">
        {{ $t("pGrhTXj8A84ieJpHf6k3L") }}
      </span>
    </span>
    <span :class="[functions?.ppc ? 'text-primary' : 'text-gray-400']">
      <credit-card-filled class="mr-1" />
      <span v-if="!isMobile">
        {{ $t("OnPSpwMATKuG2io4jQP3a") }}
      </span>
    </span>

    <span :class="[functions.vcc ? 'text-primary' : 'text-gray-400']">
      <credit-card-outlined class="mr-1" />
      <span v-if="!isMobile">
        {{ $t("S2OrYOKW-4S0okv_ixAu-") }}
      </span>
    </span>
  </div>
</template>
