<script setup>
import BasicProfile from "./BasicProfile.vue";
import { loadMemberInfo } from "@/api/member";
import CardWrap from "./card/CardWrap.vue";
import useStorage from "@/hooks/useStorage";
import { useAppStore } from "@/libs/stores/modules/app";
const appStore = useAppStore();

const route = useRoute();

const loading = ref(false);

const userModel = reactive({
});
const fetch = async () => {
  loading.value = true;
  const { statusCode, content } = await loadMemberInfo({
    uuid: route.params.uuid,
  });
  loading.value = false;
  if (statusCode === 200) {
    Object.assign(userModel, content);
  }
};
onMounted(() => {
  fetch();
});
const defaultMode = "imgTextMode";
const mode = useStorage("Member_Mode", defaultMode);
</script>
<template>
  <div class="p-4 mx-auto">
    <BasicProfile :profile="userModel" class="shadow-md"></BasicProfile>

    <ComponentTitle :text="$t('c9v0NvMxo7MffTy-TXDir')" class="text-xl mt-4">
      <template #extra v-if="!appStore.isMobile">
        <appstore-outlined class="cursor-pointer ml-2 hover:text-primary"
          :class="{ 'text-primary': mode === 'imgTextMode' }" @click="mode = 'imgTextMode'" />
        <bars-outlined class="cursor-pointer ml-2 hover:text-primary" :class="{ 'text-primary': mode === 'listMode' }"
          @click="mode = 'listMode'" />
      </template>
    </ComponentTitle>

    <CardWrap class="mt-2 shadow-md" :mode="appStore.isMobile ? 'imgTextMode' : mode" />
  </div>
</template>
