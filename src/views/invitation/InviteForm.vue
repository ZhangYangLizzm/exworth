<script setup lang="ts">
import { postMemberInvite } from "@/api/member";
import { useForm } from "@/hooks";

import { emailPattern } from "@/hooks/useFormRules";

const emit = defineEmits(["refresh"]);
const { t } = useI18n();
const formState = reactive({
  email: [],
});

const patternValidator = async (_: any, value: string) => {
  if (!emailPattern.test(value.at(-1)!)) {
    return Promise.reject(t("Ry7C9WCk708IsBie-i2YM"));
  }
  return Promise.resolve();
};
const rules = computed(() => ({
  email: [
    { required: true, message: t("8dRn48_9RTO6Q2804fgFp") },
    {
      validator: patternValidator,
    },
  ],
}));
const { handleValidate, validateInfos, resetFields } = useForm(
  formState,
  rules
);

const btnLoading = ref(false);
const handleSubmit = () => {
  // select 失去焦点需要时间
  setTimeout(async () => {
    const { values } = await handleValidate();
    if (values) {
      btnLoading.value = true;
      const { statusCode } = await postMemberInvite(values);
      btnLoading.value = false;
      if (statusCode === 200) {
        handleCancel();
        emit("refresh");
      }
    }
  }, 300);
};
const handleCancel = () => {
  setTimeout(() => {
    resetFields();
  }, 300);
};
</script>

<template>
  <div class="px-4">
    <a-form layout="vertical">
      <a-form-item
        :label="$t('kXAMWI86h-rooSEuCAow-')"
        v-bind="validateInfos.email"
      >
        <a-select
          type="textarea"
          :open="false"
          mode="tags"
          :placeholder="$t('zjBCgU--wKqHomDG3Vakr')"
          size="large"
          :tokenSeparators="[',', ' ', '，', '/', ';', '\\', '[', ']']"
          v-model:value="formState.email"
        >
        </a-select>
      </a-form-item>
      <a-form-item>
        <Tips
          :title="$t('1NLFL8YdPqQXonj5lQxvT')"
          :contents="$t('irfv2QgrQafS_6Zl73s2N')"
        />
      </a-form-item>
      <a-form-item class="text-center">
        <a-button
          class="w-40 h-10"
          type="primary"
          @click="handleSubmit"
          :loading="btnLoading"
        >
          {{ $t("VPTp-QATJSurGdzHeGrXT") }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
