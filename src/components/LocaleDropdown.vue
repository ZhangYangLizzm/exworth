<script setup lang="ts">
import { useLocale, LocalesKey } from "@/hooks/useLocale.ts";
import { MenuClickEventHandler } from "ant-design-vue/es/menu/src/interface";

const { locale, SUPPORT_LOCALES, localeText, setLocale } = useLocale();

const handleLocaleSelect: MenuClickEventHandler = ({ key }) => {
  setLocale(key as LocalesKey);
  window.location.reload();
};
</script>

<template>
  <ADropdown placement="bottom">
    <a type="text" class="text-primary ml-1">
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
