<script setup lang="ts">
import { useForm, useFormRules } from "@/hooks";
import { postSetLoginWhiteList } from "@/api/setting";
const formState = reactive({
  whiteList: "",
  authCode: "",
});
const { GoogleAuthCodeRule } = useFormRules();
const { t } = useI18n();

const ipListValidator = () => {
  return async (_: any, ipList: string) => {
    if (ipList) {
      const list = ipList.split(",");
      const isLeagel = list.every((ip) => {
        const ipSplit = ip.split(".");
        if (ipSplit.length !== 4) {
          return false;
        }
        return ipSplit.every((value) => {
          const num = +value;
          return num > 0 && num <= 255;
        });
      });
      if (isLeagel) {
        return Promise.resolve();
      }
      return Promise.reject("IP格式不符合");
    }
  };
};

const rules = reactive({
  authCode: GoogleAuthCodeRule,
  whiteList: [
    {
      required: true,
      message: t("8dRn48_9RTO6Q2804fgFp"),
    },
    {
      validator: ipListValidator(),
    },
  ],
});

const { handleValidate, validateInfos } = useForm(formState, rules);
const loading = ref(false);
const handleConfirm = async () => {
  const { values } = await handleValidate();
  if (values) {
    loading.value = true;
    await postSetLoginWhiteList(formState);
    loading.value = false;
  }
};
</script>

<template>
  <div class="p-4">
    <a-form layout="vertical">
      <a-form-item
        :label="$t('4Pf3mZrhh3LiqO5ocQQ3T')"
        required
        v-bind="validateInfos.whiteList"
      >
        <a-textarea
          v-model:value="formState.whiteList"
          :placeholder="$t('IizIVPS-xlYnKPl_EUAN2')"
        ></a-textarea>
      </a-form-item>
      <GoogleAuthCode
        v-model:value="formState.authCode"
        :validateInfo="validateInfos.authCode"
      />
      <a-form-item class="text-center">
        <a-button type="primary" @click="handleConfirm" class="w-40 h-8"
          >{{ $t("utkQ-uv-4gXBHkFXvGL5u") }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
