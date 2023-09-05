<script setup>
import ExModal from "@/libs/components/antd/modal/ExModal.vue";
import GoogleAuthGuide from "@/components/GoogleAuth/GoogleAuthGuide.vue";
import { ResetPassword, ResetCode, BindGoogleAuth, Cell } from "./components";
import { useSettingStore } from "@/stores/modules/setting";
import { useAppStore } from "@/stores/modules/app";
import { getGoogleSecretKey } from "@/api/setting";

const appStore = useAppStore();
const settingStore = useSettingStore();

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
const resetCodeRef = ref();
const resetCode = () => {
  resetCodeRef?.value.show();
};

const loading = ref(false);

onMounted(() => {
  settingStore.fetchConfig();
});
</script>
<template>
  <div class="p-4 h-full">
    <div
      v-if="settingStore.loading"
      class="w-full h-full flex justify-center items-center"
    >
      <a-spin :spinning="settingStore.loading" size="large" />
    </div>
    <div v-else>
      <Cell :title="$t('18QwzD-fefF67FeBfT3TO')" :divider="true">
        <template #content>
          <p class="text-[#00000073]">{{ $t("Hjnh0CglItCAlSV7VeuUx") }}</p>
        </template>
        <template #action>
          <a-button type="primary" @click="resetPassword">
            {{ $t("3e8G0J4havVJDcQOKOOp_") }}
          </a-button>
        </template>
      </Cell>
      <ExModal
        isBottom
        :isMobile="appStore.isMobile"
        ref="resetPasswordRef"
        :customTitle="$t('B-q5-tYEdulJDodx4ihUb')"
      >
        <ResetPassword />
      </ExModal>

      <Cell :title="$t('SlJFgfv49xSHi9mbjdw4e')" :divider="true">
        <template #content>
          <p class="text-[#00000073]">
            {{ $t("-UKsKcsbpTKeem_VtAeE7") }}
            <span>
              <GoogleAuthGuide :text="$t('YSw1k0zmH_DiBXtPz9_yJ')" />
            </span>
            <br />{{ $t("IuUoyt4239fMRmxLJtJ0t") }}<br />
            {{ $t("IW8d0GgWYa49MKjkG9hBM") }}
          </p>
        </template>
        <template #action>
          <a-button
            :loading="loading"
            type="primary"
            @click="showDrawer"
            v-if="!settingStore.config.ifGoogleSecretKeyBound"
            >{{ $t("pYAVunqd83mox12MvD_DW") }}</a-button
          >
        </template>
      </Cell>

      <BindGoogleAuth
        v-model:visible="visible"
        :codeImgUrl="res?.codeImgUrl"
        :secretKey="res?.secretKey"
      />
      <Cell :title="$t('4Pf3mZrhh3LiqO5ocQQ3T')" :divider="true">
        <template #content>
          <p class="text-[#00000073]">
            {{ $t("F40221OplXwtCfKpjPD3j") }}<br />
            {{
              $t("vcMAWw5y_SAl2AsXpHfMC", {
                count: settingStore.config.loginIpWhiteList?.length || 0,
              })
            }}
          </p>
        </template>
      </Cell>
      <Cell :title="$t('yj74dO9iA9rD0NRDm8h2n')">
        <template #content>
          <p class="text-[#00000073]">
            {{ $t("FPnQ4woLU-EYPfpsY6oX6") }}<br />
            {{ $t("A6kNlDZAbmYayenIODMIj") }}
            <a @click="settingStore.fetchConfig()">{{
              $t("_CD1ho41rkMxFKnIKKvKk")
            }}</a>
            {{ $t("5GYt-vY5CTG3o72Y5GCxr") }}
          </p>
        </template>
        <template #action>
          <a-button
            type="primary"
            @click="resetCode"
            v-if="!settingStore.config.isSetWithdrawPassword"
          >
            {{ $t("mcPGcZyC7QxBRP9o_nR9i") }}
          </a-button>
        </template>
      </Cell>
      <ExModal
        isBottom
        ref="resetCodeRef"
        :customTitle="$t('y1TuxkHrhkk1OLo6_jtVB')"
        :isMobile="appStore.isMobile"
      >
        <ResetCode />
      </ExModal>
    </div>
  </div>
</template>
