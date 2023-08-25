<script setup>
import ComponentTitle from "@/components/ComponentTitle.vue";
import ExModal from "@/libs/components/antd/modal/ExModal.vue";
import ResetPassword from "./components/ResetPassword.vue";
import GoogleAuthGuide from "@/components/GoogleAuth/GoogleAuthGuide.vue";
import BindGoogleAuth from "./components/BindGoogleAuth.vue";
import Cell from "./components/Cell.vue";
import { useSettingStore } from "../../stores/modules/setting";
// import { useUserStore } from "@/stores/modules/user";
// const userStore = useUserStore();

import { getGoogleSecretKey } from "@/api/setting";
const settingStore = useSettingStore();
onMounted(() => {
  settingStore.fetchConfig();
});
const { t } = useI18n();
const resetPasswordRef = ref();
const resetPassword = () => {
  resetPasswordRef?.value.show();
};

const visible = ref(false);
const res = ref();
const showDrawer = async () => {
  loading.value = true;
  const { content, statusCode } = await getGoogleSecretKey();
  if (statusCode === 200) {
    res.value = content;
    loading.value = false;
    visible.value = true;
  }
};

const loading = ref(false);
</script>
<template>
  <div class="p-4 h-full">
    <div v-if="settingStore.loading" class="w-full h-full flex justify-center items-center">
      <a-spin :spinning="settingStore.loading" size="large" />
    </div>
    <div v-else>
      <!-- <ComponentTitle :text="t('44Nf1CAj5MDMYcXCacRgo')" /> -->

      <Cell :title="t('18QwzD-fefF67FeBfT3TO')" :divider="true">
        <template #content>
          <p class="text-[#00000073]">{{ t("Hjnh0CglItCAlSV7VeuUx") }}</p>
        </template>
        <template #action>
          <a-button type="primary" @click="resetPassword">
            {{ t("3e8G0J4havVJDcQOKOOp_") }}
          </a-button>
        </template>
      </Cell>
      <ExModal ref="resetPasswordRef" :customTitle="t('B-q5-tYEdulJDodx4ihUb')">
        <ResetPassword />
      </ExModal>

      <Cell :title="t('SlJFgfv49xSHi9mbjdw4e')" :divider="true">
        <template #content>
          <p class="text-[#00000073]">
            {{ t("-UKsKcsbpTKeem_VtAeE7") }}
            <span>
              <GoogleAuthGuide :text="t('YSw1k0zmH_DiBXtPz9_yJ')" />
            </span>
            <br />{{ t("IuUoyt4239fMRmxLJtJ0t") }}<br />
            {{ t("IW8d0GgWYa49MKjkG9hBM") }}
          </p>
        </template>
        <template #action>
          <a-button :loading="loading" type="primary" @click="showDrawer"
            v-if="!settingStore.config.ifGoogleSecretKeyBound">{{ t("pYAVunqd83mox12MvD_DW") }}</a-button>
        </template>
      </Cell>

      <BindGoogleAuth v-model:visible="visible" :codeImgUrl="res?.codeImgUrl" :secretKey="res?.secretKey" />

      <!-- <ComponentTitle :text="t('ypfmRVfabCXrjYEsaHSgc')" />
      <Cell :title="t('buu0ilKrihPvPo-ICWP_I')">
        <template #content>
          <a-descriptions :column="1" :content-style="{ color: '#00000073' }">
            <a-descriptions-item :label="t('C8e-GonL-voVt9790n5Dw')">{{
              userStore.uid
            }}</a-descriptions-item>
            <a-descriptions-item :label="t('6bCEBw4YLXZV25VFtfJJI')">{{
              userStore.username
            }}</a-descriptions-item>
          </a-descriptions>
        </template>
      </Cell> -->

      <Cell :title="t('4Pf3mZrhh3LiqO5ocQQ3T')" :divider="true">
        <template #content>
          <p class="text-[#00000073]">
            {{ t("F40221OplXwtCfKpjPD3j") }}<br />
            {{
              t("vcMAWw5y_SAl2AsXpHfMC", {
                count: settingStore.config.loginIpWhiteList?.length || 0,
              })
            }}
          </p>
        </template>
      </Cell>
      <Cell :title="t('yj74dO9iA9rD0NRDm8h2n')">
        <template #content>
          <p class="text-[#00000073]">
            {{ t("FPnQ4woLU-EYPfpsY6oX6") }}<br />
            {{ t("A6kNlDZAbmYayenIODMIj") }}
            <a>{{ t("_CD1ho41rkMxFKnIKKvKk") }}</a>
            {{ t("5GYt-vY5CTG3o72Y5GCxr") }}
          </p>
        </template>
      </Cell>
    </div>
  </div>
</template>
