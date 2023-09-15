<script setup lang="ts">
import { useLocale, LocalesKey } from "@/hooks/useLocale.ts";

const { locale, SUPPORT_LOCALES, localeText, setLocale } = useLocale();

const handleLocaleSelect = ({ key }: { key: LocalesKey }) => {
  setLocale(key);
  window.location.reload();
};
</script>

<template>
  <ADropdown placement="bottom">
    <a class="px-1">
      {{ localeText }}
    </a>
    <template #overlay>
      <AMenu @click="handleLocaleSelect">
        <AMenuItem
          v-for="supportLocaleItem in SUPPORT_LOCALES"
          :key="supportLocaleItem.value"
          :disabled="supportLocaleItem.value === locale"
        >
          {{ supportLocaleItem.label }}
        </AMenuItem>
      </AMenu>
    </template>
  </ADropdown>
</template>
