<script setup>
import GoogleAuthGuide from "@/components/GoogleAuth/GoogleAuthGuide.vue";
import { postGoogleAuth } from "@/api/setting";
import { useUserStore } from "@/stores/modules/user";
import { useSettingStore } from "@/stores/modules/setting";
const settingStore = useSettingStore();
const { t } = useI18n();
const userStore = useUserStore();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  codeImgUrl: String,
  secretKey: String,
});

const emit = defineEmits(["update:visible"]);

const closeDrawer = () => {
  emit("update:visible", false);
  code.value = new Array(6).fill("");
};
const mode = ref("scan");

const inputRefs = ref([]);
const code = ref(new Array(6).fill(""));

const handleChange = async (index) => {
  if (code.value[index].length === 1 && index < code.value.length - 1) {
    inputRefs.value[index + 1].focus();
  }
  if (index === code.value.length - 1) {
    const completedCode = code.value.join("");
    emit("update:visible", false);
    await postGoogleAuth({
      authCode: completedCode,
      secretKey: props.secretKey,
    });
    settingStore.fetchConfig();
  }
};
</script>

<template>
  <a-drawer
    :title="t('-U3HyWKyrOuRzqUpJAU-u')"
    placement="right"
    :visible="props.visible"
    :closable="false"
    width="480px"
    @close="closeDrawer"
    @afterVisibleChange="onDrawerVisible"
  >
    <template #extra>
      <close-outlined @click="closeDrawer" />
    </template>

    <div class="mb-4">
      <p class="text-xl font-bold">{{ t("G_iTl-wrlc73k_p_Y1vKV") }}</p>
      <p>
        {{ t("ne9qgm7oTivc5uXN6iDYT") }}
        <span><GoogleAuthGuide :text="t('hyTktdi1rYotByMVitGl9')" /></span>
      </p>
    </div>

    <div class="mb-4">
      <p class="text-xl font-bold">{{ t("EUDLgBeynn8zAT08veKJy") }}</p>
      <p>{{ t("tfblGfZVLlcR0wbkFTJHA") }}</p>
      <div class="flex items-center justify-center flex-col my-4">
        <div v-show="mode === 'scan'" class="text-center">
          <img
            :src="props.codeImgUrl"
            alt="code"
            class="w-[200px] min-h-[200px]"
          />
          <p>{{ t("-rDfy5Kk7mRTF_gTK2jh1") }}</p>
          <a @click="mode = 'input'"> {{ t("wVQDP070UIYMNbjwQjWQE") }} </a>
        </div>

        <div v-show="mode === 'input'" class="text-center">
          <div class="min-h-[200px] flex flex-col justify-around">
            <p>{{ t("oEkipQiC2TsKS18PIsi8u") }}:{{ userStore.uid }}</p>
            <p>{{ t("1vtSf_CqxwRTUPy7xfMwm") }}:{{ props.secretKey }}</p>
          </div>
          <p>{{ t("mI4abfGfF4c5qKJmmhLWD") }}</p>
          <a @click="mode = 'scan'"> {{ t("ceME83LNLBlEEflXQuMuc") }} </a>
        </div>
      </div>
    </div>

    <div>
      <p class="text-xl font-bold">{{ t("FFgND7iSVn_SVSzE-pJUk") }}</p>
      <p>{{ t("PtQyq9WXYRBLzBLSmPFpN") }}</p>
      <div class="flex items-center justify-center">
        <div class="space-x-2">
          <a-input
            v-for="(value, index) in code"
            :key="index"
            ref="inputRefs"
            v-model:value="code[index]"
            @change="handleChange(index)"
            class="p-2 text-center w-10 rounded-md"
            maxlength="1"
          />
        </div>
      </div>
    </div>
  </a-drawer>
</template>
