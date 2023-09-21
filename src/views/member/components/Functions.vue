<script setup lang="ts">
defineProps({
  functions: {
    type: Object,
    default: () => {},
  },
  isMobile: Boolean,
});
</script>

<template>
  <div class="flex items-center gap-x-4">
    <span :class="[functions?.transfer ? 'text-primary' : 'text-gray-400']">
      <swap-outlined />
      <span v-if="!isMobile">
        {{ $t("pGrhTXj8A84ieJpHf6k3L") }}
      </span>
    </span>
    <span :class="[functions?.ppc ? 'text-primary' : 'text-gray-400']">
      <credit-card-filled />
      <span v-if="!isMobile">
        {{ $t("OnPSpwMATKuG2io4jQP3a") }}
      </span>
    </span>

    <span :class="[functions.vcc ? 'text-primary' : 'text-gray-400']">
      <credit-card-outlined />
      <span v-if="!isMobile">
        {{ $t("S2OrYOKW-4S0okv_ixAu-") }}
      </span>
    </span>
  </div>
</template>
