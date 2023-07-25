<script setup>
import GoogleAuthenticatorDownloadGuide from './DownloadGoogle.vue'

const value = ref('')
</script>
<template>
  <div class="p-12">
    <a-popover
      trigger="hover"
    >
      <template #content>
        <GoogleAuthenticatorDownloadGuide />
      </template>
      <a>{{ $t('YSw1k0zmH_DiBXtPz9_yJ') }}</a>
    </a-popover>
    <!-- <GridInput v-model:value="value"></GridInput> -->
  </div>
</template>
