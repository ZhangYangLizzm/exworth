<script setup lang="ts">
import { firstLogin } from "@/api/user";
import { useForm } from "@/hooks";
const { t } = useI18n();

const formRef = ref();

const formState = reactive({
  oldPassword: undefined,
  password: undefined,
  confirm: undefined,
  code: undefined,
});

const props = defineProps({
  name: String,
});

const validateToNextPassword = async (_: any, value: string) => {
  if (value && confirmDirty.value) {
    formRef.value?.validateFields(["confirm"], { force: true });
  }
  return Promise.resolve();
};

const compareToOldPassword = async (_: any, value: string) => {
  if (value && value === formState.oldPassword) {
    return Promise.reject(t("CUF3MBsbrBOnLprGbtonD"));
  } else {
    return Promise.resolve();
  }
};

const compareToFirstPassword = async (_: any, value: string) => {
  if (value && value !== formState.password) {
    return Promise.reject(t("_i4wrqvdjvlH7txojo-Y6"));
  } else {
    return Promise.resolve();
  }
};

const handleConfirmBlur = async (e: FocusEvent) => {
  const value =( e.target as HTMLInputElement).value;
  confirmDirty.value = confirmDirty.value || !!value;
};

const rules = computed(() => ({
  oldPassword: [{ required: true, message: t("8dRn48_9RTO6Q2804fgFp") }],
  password: [
    { required: true, message: t("8dRn48_9RTO6Q2804fgFp") },
    { min: 8, max: 20, message: t("Zd-iK_4fwRetIFNm8Nd4M") },
    {
      pattern:
        /(?!.*[\u4E00-\u9FA5\s])(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^a-zA-Z\d]+$)^./,
      message: t("WWbPeuj1qLMohnCd5qzyw"),
    },
    { validator: validateToNextPassword },
    { validator: compareToOldPassword },
  ],
  confirm: [
    { required: true, message: t("8dRn48_9RTO6Q2804fgFp") },
    { validator: compareToFirstPassword },
  ],
  code: [
    { required: true, message: t("8dRn48_9RTO6Q2804fgFp") },
    { len: 4, message: t("cWWvrwCrLJY6luPt-0_h8") },
  ],
}));
const loading = ref(false);
const confirmDirty = ref(false);

const { handleValidate, validateInfos } = useForm(formState, rules);

const handleSubmit = async () => {
  const { values } = await handleValidate();
  if (values) {
    loading.value = true;
    const { statusCode } = await firstLogin({ ...values, name: props.name });
    loading.value = false;
    if (statusCode === 200) {
      window.location.reload();
    }
  }
};
</script>
<template>
  <a-form class="mx-auto max-w-[368px]" :rules="rules" :ref="formRef">
    <a-form-item :label="$t('akxcRV8N1NeQJRjWoFalJ')">{{ name }}</a-form-item>
    <a-form-item v-bind="validateInfos.oldPassword">
      <a-input-password
        size="large"
        :placeholder="$t('AkYvt09TzAKTkYL1On_p3')"
        v-model:value="formState.oldPassword"
      >
      </a-input-password>
    </a-form-item>
    <a-form-item v-bind="validateInfos.password">
      <a-input-password
        size="large"
        :placeholder="$t('mAEK8HwUsfygHzyJxo4ON')"
        v-model:value="formState.password"
      >
      </a-input-password>
    </a-form-item>
    <a-form-item v-bind="validateInfos.confirm">
      <a-input-password
        size="large"
        :placeholder="$t('vIf00-9pMhlLRdqg_iRi1')"
        v-model:value="formState.confirm"
        @blur="(e) => handleConfirmBlur(e)"
      >
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-form-item
        v-bind="validateInfos.code"
        :style="{ display: 'inline-block', width: '248px' }"
      >
        <a-input
          size="large"
          :placeholder="$t('0rfxEuvqAP2QeroIih9yC')"
          v-model:value="formState.code"
        >
        </a-input>
      </a-form-item>

      <a-form-item
        :style="{
          display: 'inline-block',
          width: '100px',
          marginLeft: '20px',
          verticalAlign: 'middle',
        }"
      >
        <GraphValidateCodeImage open ref="graphCode" />
      </a-form-item>
    </a-form-item>

    <a-button
      type="primary"
      size="large"
      @click="handleSubmit"
      block
      :loading="loading"
    >
      {{ $t("jLzFLAlFFSK9y4A-QE8Ye") }}
    </a-button>
  </a-form>
</template>
