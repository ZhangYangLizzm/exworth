<script setup lang="ts">
import LoginForm from "./components/LoginForm.vue";
import ResetForm from "./components/ResetForm.vue";
import MfaForm from "./components/MfaForm.vue";

import dayjs from "dayjs";

const thisYear = computed(() => dayjs().year());
const step = ref("login");
const name = ref("");
const reset = (value:string) => {
  name.value = value;
  step.value = "reset";
};
const mfa = () => {
  step.value = "mfa";
};
</script>

<template>
  <div class="w-full h-full login overflow-hidden flex flex-col rounded-xl">
    <header class="header h-16 flex items-center px-4 justify-between">
      <div class="h-6">
        <Logo dark width="8rem" />
      </div>
      <LocaleDropdown />
    </header>
    <main class="flex-grow flex flex-col items-center pt-6">
      <div class="mb-8 h-8">
        <Logo dark />
      </div>
      <div class="text-lg text-center">{{ $t("uRZHmMHGIbHs9TMJtbzT6") }}</div>
      <div class="mt-8">
        <LoginForm v-if="step === 'login'" @reset="reset" @mfa="mfa" />

        <ResetForm v-else-if="step === 'reset'" :name="name" />
        <MfaForm v-else-if="step === 'mfa'" />
      </div>
    </main>
    <footer class="text-center w-full h-16 flex items-center justify-center">
      Copyright © 2017-{{ thisYear }} PPC
    </footer>
  </div>
</template>

<style scoped lang="less">
.login {
  background-image: url("@/assets/images/login/bg_pc.png");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #fff;
}
</style>
