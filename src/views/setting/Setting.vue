<script setup lang="ts">
import {
  Cell,
  ResetPassword,
  ResetCode,
  BindGoogleAuth,
  SetAPI,
  SetLoginWhiteList,
} from "./components";
import { useSettingStore } from "@/stores/setting";
import { getGoogleSecretKey } from "@/api/setting";
import {
  useDrawerInject,
  SETTING_GOOGLE_AUTH,
  SETTING_RESET_PASSWORD,
  SETTING_RESET_CODE,
  SETTING_APIKEY,
  SETTING_LOGIN_WHITELIST,
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
    <div class="overflow-y-auto h-full" v-else>
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
            v-if="settingStore.config?.ifGoogleSecretKeyBound"
            :disabled="drawerPattern === SETTING_GOOGLE_AUTH"
            >{{ $t("pYAVunqd83mox12MvD_DW") }}</a-button
          >
        </template>
      </Cell>

      <Cell :title="$t('4Pf3mZrhh3LiqO5ocQQ3T')">
        <template #content>
          <div>
            <span>已设置IP白名单 : </span>
            <a-tag class="px-2 py-1 text-sm" color="success">192.168.0.1</a-tag>
          </div>
          <p>
            {{ $t("F40221OplXwtCfKpjPD3j") }}<br />
            {{
              $t("vcMAWw5y_SAl2AsXpHfMC", {
                count: settingStore.config?.loginIpWhiteList?.length || 0,
              })
            }}
          </p>
        </template>
        <template #action>
          <a-button
            type="primary"
            @click="wrapClick(SETTING_LOGIN_WHITELIST)"
            :disabled="drawerPattern === SETTING_LOGIN_WHITELIST"
            >{{ $t("tn1dw0_d4hpGoJZiMaCjB") }}</a-button
          >
        </template>
      </Cell>
      <Cell :title="$t('yj74dO9iA9rD0NRDm8h2n')">
        <template #content>
          <p>
            {{ $t("FPnQ4woLU-EYPfpsY6oX6") }}<br />
            {{ $t("A6kNlDZAbmYayenIODMIj") }}
            <a @click="settingStore.fetchConfig()" class="text-primary">{{
              $t("_CD1ho41rkMxFKnIKKvKk")
            }}</a>
            {{ $t("5GYt-vY5CTG3o72Y5GCxr") }}
          </p>
        </template>
        <template #action>
          <a-button
            type="primary"
            @click="wrapClick(SETTING_RESET_CODE)"
            v-if="!settingStore.config?.isSetWithdrawPassword"
            :disabled="drawerPattern === SETTING_RESET_CODE"
          >
            {{ $t("mcPGcZyC7QxBRP9o_nR9i") }}
          </a-button>
        </template>
      </Cell>

      <Cell title="API KEY" :divider="false">
        <template #content>
          <p>
            {{ $t("uWhhhJI1_Rf7xmMk5h8mu") }}
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

  <ExDrawer :open="drawerPattern === SETTING_RESET_PASSWORD" :title="$t('B-q5-tYEdulJDodx4ihUb')">
    <ResetPassword />
  </ExDrawer>
  <ExDrawer :open="drawerPattern === SETTING_GOOGLE_AUTH" :title="$t('1BLfOjzdVKxiPjNW8eTZR')">
    <BindGoogleAuth
      :codeImgUrl="googleSecretKeyContent?.codeImgUrl"
      :secretKey="googleSecretKeyContent?.secretKey"
    />
  </ExDrawer>
  <ExDrawer :open="drawerPattern === SETTING_RESET_CODE" :title="$t('y1TuxkHrhkk1OLo6_jtVB')">
    <ResetCode />
  </ExDrawer>
  <ExDrawer :open="drawerPattern === SETTING_APIKEY" :title="$t('0Uir9fGp6oKkJneCTNZWJ')">
    <SetAPI />
  </ExDrawer>
  <ExDrawer :open="drawerPattern === SETTING_LOGIN_WHITELIST" :title="$t('JTWzP44eyItAI3ZVXPe-K')">
    <SetLoginWhiteList />
  </ExDrawer>
</template>
