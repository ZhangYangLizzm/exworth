import { getConfig } from "@/api/setting";

export const useSettingStore = defineStore("setting", () => {
  const config = ref<Record<string, any>>({
    isSetWithdrawPassword: true,
  });
  const loading = ref(false);
  const fetchConfig = async () => {
    loading.value = true;
    const { statusCode, content } = await getConfig();
    if (statusCode === 200) {
      config.value = content;
      loading.value = false;
    }
  };

  return {
    config,
    fetchConfig,
    loading,
  };
});
