<script setup lang="ts">
import { getMerchantBaseInfo } from "@/api/merchant";
const { merchantId } = defineProps<{
  merchantId: string;
}>();

const merchantBaseInfo = ref();
const isLoading = ref(true);
onMounted(async () => {
  merchantBaseInfo.value = await getMerchantBaseInfo(merchantId);
  isLoading.value = false;
});
</script>

<template>
  <ASkeleton active :loading="isLoading">
    {{ merchantBaseInfo.content }}
  </ASkeleton>
</template>

<style scoped lang="less"></style>
