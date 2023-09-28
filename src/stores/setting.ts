import { getConfig } from "@/api/setting";
import { SettingConfig } from "@/api/types/setting";

export const useSettingStore = defineStore("setting", () => {
  const config = ref<SettingConfig>();
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
