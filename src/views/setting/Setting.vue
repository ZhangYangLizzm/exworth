<script setup lang="ts">
import {
  Cell,
  ResetPassword,
  ResetCode,
  BindGoogleAuth,
  SetAPI,
} from "./components";
import { useSettingStore } from "@/stores/setting";
import { getGoogleSecretKey } from "@/api/setting";
import {
  useDrawerInject,
  SETTING_GOOGLE_AUTH,
  SETTING_RESET_PASSWORD,
  SETTING_RESET_CODE,
  SETTING_APIKEY,
} from "@/hooks/useDrawer.ts";

const { drawerPattern, wrapClick } = useDrawerInject();

const settingStore = useSettingStore();
const googleSecretKeyContent = ref();
const loading = ref(false);

const bindGoogleAuth = async () => {
  loading.value = true;
  const { content, statusCode } = await getGoogleSecretKey();
  loading.value = false;
  if (statusCode === 200) {
    googleSecretKeyContent.value = content;
  }
};

onMounted(() => {
  settingStore.fetchConfig();
});
</script>
<template>
  <div class="h-full">
    <div
      v-if="settingStore.loading"
      class="w-full h-full flex justify-center items-center"
    >
      <a-spin :spinning="settingStore.loading" size="large" />
    </div>
    <div class="overflow-y-auto h-full pr-4" v-else>
      <Cell :title="$t('18QwzD-fefF67FeBfT3TO')">
        <template #content>
          <p>{{ $t("Hjnh0CglItCAlSV7VeuUx") }}</p>
        </template>
        <template #action>
          <a-button
            type="primary"
            @click="wrapClick(SETTING_RESET_PASSWORD)"
            :disabled="drawerPattern === SETTING_RESET_PASSWORD"
          >
            {{ $t("3e8G0J4havVJDcQOKOOp_") }}
          </a-button>
        </template>
      </Cell>

      <Cell :title="$t('SlJFgfv49xSHi9mbjdw4e')">
        <template #content>
          <p>
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
            @click="wrapClick(SETTING_GOOGLE_AUTH, bindGoogleAuth)"
            v-if="!settingStore.config.ifGoogleSecretKeyBound"
            :disabled="drawerPattern === SETTING_GOOGLE_AUTH"
            >{{ $t("pYAVunqd83mox12MvD_DW") }}</a-button
          >
        </template>
      </Cell>

      <Cell :title="$t('4Pf3mZrhh3LiqO5ocQQ3T')">
        <template #content>
          <p>
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
          <p>
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
            @click="wrapClick(SETTING_RESET_CODE)"
            v-if="!settingStore.config.isSetWithdrawPassword"
            :disabled="drawerPattern === SETTING_RESET_CODE"
          >
            {{ $t("mcPGcZyC7QxBRP9o_nR9i") }}
          </a-button>
        </template>
      </Cell>

      <Cell title="API KEY" :divider="false">
        <template #content>
          <p>
            密鑰允許你驗證API請求，您可以像我們提供您的公鑰信息，以使我們在交易時解析它。
          </p>
        </template>
        <template #action>
          <a-button
            type="primary"
            @click="wrapClick(SETTING_APIKEY)"
            :disabled="drawerPattern === SETTING_APIKEY"
          >
            {{ $t("mcPGcZyC7QxBRP9o_nR9i") }}
          </a-button>
        </template>
      </Cell>
    </div>
  </div>

  <ExDrawer @afterClose="drawerPattern = ''">
    <ResetPassword v-if="drawerPattern === SETTING_RESET_PASSWORD" />
    <BindGoogleAuth
      v-if="drawerPattern === SETTING_GOOGLE_AUTH"
      :codeImgUrl="googleSecretKeyContent?.codeImgUrl"
      :secretKey="googleSecretKeyContent?.secretKey"
    />
    <ResetCode v-if="drawerPattern === SETTING_RESET_CODE" />
    <SetAPI v-if="drawerPattern === SETTING_APIKEY" />
  </ExDrawer>
</template>
