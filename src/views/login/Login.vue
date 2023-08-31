<script setup>
import Header from "@/libs/components/layouts/Header.vue";
import Logo from "@/libs/components/logo";
import { SUPPORT_LOCALES_MAP } from "@/plugins/i18n";
import { useAppStore } from "@/libs/stores/modules/app";
import LoginForm from "./LoginForm.vue";
import ResetForm from "./ResetForm.vue";
import MfaForm from "./MfaForm.vue";

const thisYear = computed(() => dayjs().year());

const step = ref("login");
const name = ref("");
const reset = (value) => {
  name.value = value;
  step.value = "reset";
};
const mfa = () => {
  step.value = "mfa";
};

const appStore = useAppStore();

const handleLocaleClick = ({ key }) => {
  appStore.setLocale(key);
  window.location.reload();
};
</script>
<template>
  <a-layout class="login">
    <Header class="!bg-transparent w-full top-0">
      <template #settings>
        <a-dropdown>
          <a>{{ appStore.localeText }}</a>
          <template #overlay>
            <a-menu @click="handleLocaleClick">
              <a-menu-item
                v-for="(item, key) in SUPPORT_LOCALES_MAP"
                :key="key"
              >
                {{ item }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </Header>
    <a-layout-content class="bg-transparent content">
      <div class="mx-auto w-11/12 flex flex-col justify-center h-full">
        <div class="mx-auto max-w-[215px] mb-10">
          <Logo dark />
        </div>
        <div class="text-center text-lg">{{ $t("uRZHmMHGIbHs9TMJtbzT6") }}</div>
        <div class="mt-8">
          <LoginForm v-if="step === 'login'" @reset="reset" @mfa="mfa" />
          <ResetForm v-else-if="step === 'reset'" :name="name" />
          <MfaForm v-else-if="step === 'mfa'" />
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer
      class="bg-transparent text-center w-full bottom-0 text-gray-300"
    >
      Copyright © 2017-{{ thisYear }} PPC
    </a-layout-footer>
  </a-layout>
</template>

<style lang="less" scoped>
.login {
  min-height: 100vh;
  background-image: url("/images/login/bg_pc.png");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #fff;
}

.content {
  height: calc(100vh - 64px - 70px);
}
</style>
