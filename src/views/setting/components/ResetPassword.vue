<script setup>
import { postUpdatePassword } from "@/api/user";
import { useForm } from "@/libs/hooks/useForm";
const { t } = useI18n();

const formState = reactive({
  oldPassword: undefined,
  password: undefined,
  confirm: undefined,
});

const validateToNextPassword = async (_, value) => {
  if (value && confirmDirty.value) {
    formRef.value?.validateFields(["confirm"], { force: true });
  }
  return Promise.resolve();
};

const compareToOldPassword = async (_, value) => {
  if (value && value === formState.oldPassword) {
    return Promise.reject(t("CUF3MBsbrBOnLprGbtonD"));
  } else {
    return Promise.resolve();
  }
};

const compareToFirstPassword = async (_, value) => {
  if (value && value !== formState.password) {
    return Promise.reject(t("_i4wrqvdjvlH7txojo-Y6"));
  } else {
    return Promise.resolve();
  }
};

const handleConfirmBlur = async (e) => {
  const value = e.target.value;
  confirmDirty.value = confirmDirty.value || !!value;
};

const rules = computed(() => ({
  oldPassword: [{ required: true, message: t("8dRn48_9RTO6Q2804fgFp") }],
  password: [
    { required: true, message: t("8dRn48_9RTO6Q2804fgFp") },
    { min: 8, max: 20, message: t("Zd-iK_4fwRetIFNm8Nd4M") },
    {
      pattern: /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^./,
      message: t("WWbPeuj1qLMohnCd5qzyw"),
    },
    { validator: validateToNextPassword },
    { validator: compareToOldPassword },
  ],
  confirm: [
    { required: true, message: t("8dRn48_9RTO6Q2804fgFp") },
    { validator: compareToFirstPassword },
  ],
}));
const loading = ref(false);
const confirmDirty = ref(false);

const { handleValidate, validateInfos } = useForm(formState, rules);

const handleSubmit = async () => {
  const { values } = await handleValidate();
  if (values) {
    loading.value = true;
    await postUpdatePassword({ ...values });
    loading.value = false;
  }
};
</script>

<template>
  <a-form :rules="rules" class="px-4 py-2" layout="vertical">
    <a-form-item v-bind="validateInfos.oldPassword" :label="$t('zTssdt-Ydi78yD4g1dX5R')">
      <a-input-password
        :placeholder="$t('AkYvt09TzAKTkYL1On_p3')"
        v-model:value="formState.oldPassword"
      >
      </a-input-password>
    </a-form-item>
    <a-form-item v-bind="validateInfos.password" :label="$t('mAEK8HwUsfygHzyJxo4ON')">
      <a-input-password
        :placeholder="$t('mAEK8HwUsfygHzyJxo4ON')"
        v-model:value="formState.password"
      >
      </a-input-password>
    </a-form-item>
    <a-form-item v-bind="validateInfos.confirm" :label="$t('vIf00-9pMhlLRdqg_iRi1')">
      <a-input-password
        :placeholder="$t('vIf00-9pMhlLRdqg_iRi1')"
        v-model:value="formState.confirm"
        @blur="handleConfirmBlur"
      >
      </a-input-password>
    </a-form-item>

    <div class="flex justify-center items-center">
      <a-button type="primary" @click="handleSubmit" :loading="loading">
        {{ $t("jLzFLAlFFSK9y4A-QE8Ye") }}
      </a-button>
    </div>
  </a-form>
</template>
