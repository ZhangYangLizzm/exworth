<script setup lang="ts">
import { getMerchantPayInfo } from "@/api/merchant";
const { merchantId } = defineProps<{
  merchantId: string;
}>();

const merchantPayInfo = ref();
const isLoading = ref(true);
onMounted(async () => {
  merchantPayInfo.value = await getMerchantPayInfo(merchantId);
  isLoading.value = false;
});
</script>

<template>
  <ASkeleton active :loading="isLoading">
    {{ merchantPayInfo.content }}
  </ASkeleton>
</template>

<style scoped lang="less"></style>
