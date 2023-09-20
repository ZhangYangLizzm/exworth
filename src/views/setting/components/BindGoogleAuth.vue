<script setup lang="ts">
import { postGoogleAuth } from "@/api/setting";
import { useUserStore } from "@/stores/user";
import { useSettingStore } from "@/stores/setting";
import { VNodeRef } from "vue";

const settingStore = useSettingStore();
const userStore = useUserStore();
const props = defineProps({
  codeImgUrl: String,
  secretKey: String,
});

const mode = ref("scan");

const inputRefs = ref<VNodeRef[]>([]);
const code = ref(new Array(6).fill(""));

const handleChange: any = async (index: number) => {
  if (code.value[index].length === 1 && index < code.value.length - 1) {
    (inputRefs.value[index + 1] as unknown as HTMLInputElement).focus();
  }
  if (index === code.value.length - 1) {
    const completedCode = code.value.join("");
    await postGoogleAuth({
      authCode: completedCode,
      secretKey: props.secretKey,
    });
    settingStore.fetchConfig();
  }
};
</script>

<template>
  <div>
    <div class="mb-4">
      <p class="text-xl font-bold">{{ $t("G_iTl-wrlc73k_p_Y1vKV") }}</p>
      <p>
        {{ $t("ne9qgm7oTivc5uXN6iDYT") }}
        <span>
          <GoogleAuthGuide :text="$t('hyTktdi1rYotByMVitGl9')" />
        </span>
      </p>
    </div>

    <div class="mb-4">
      <p class="text-xl font-bold">{{ $t("EUDLgBeynn8zAT08veKJy") }}</p>
      <p>{{ $t("tfblGfZVLlcR0wbkFTJHA") }}</p>
      <div class="flex items-center justify-center flex-col my-4">
        <div v-show="mode === 'scan'" class="text-center">
          <img
            :src="props.codeImgUrl"
            alt="code"
            class="w-[200px] min-h-[200px]"
          />
          <p>{{ $t("-rDfy5Kk7mRTF_gTK2jh1") }}</p>
          <a @click="mode = 'input'"> {{ $t("wVQDP070UIYMNbjwQjWQE") }} </a>
        </div>

        <div v-show="mode === 'input'" class="text-center">
          <div class="min-h-[200px] flex flex-col justify-around">
            <p>{{ $t("oEkipQiC2TsKS18PIsi8u") }}:{{ userStore.uuid }}</p>
            <p>{{ $t("1vtSf_CqxwRTUPy7xfMwm") }}:{{ props.secretKey }}</p>
          </div>
          <p>{{ $t("mI4abfGfF4c5qKJmmhLWD") }}</p>
          <a @click="mode = 'scan'"> {{ $t("ceME83LNLBlEEflXQuMuc") }} </a>
        </div>
      </div>
    </div>

    <div>
      <p class="text-xl font-bold">{{ $t("FFgND7iSVn_SVSzE-pJUk") }}</p>
      <p>{{ $t("PtQyq9WXYRBLzBLSmPFpN") }}</p>
      <div class="flex items-center justify-center">
        <div class="space-x-1">
          <template v-for="(_, index) in code" :key="index">
            <a-input
              :ref="inputRefs[index]"
              v-model:value="code[index]"
              @change="handleChange(index)"
              class="p-2 text-center w-8 h-8 rounded-md"
              :maxlength="1"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
