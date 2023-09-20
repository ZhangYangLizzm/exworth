<script setup lang="ts">
import { useForm, useFormRules } from "@/hooks";

const SelectSercretType = 1;
const InputForm = 2;

const step = ref(SelectSercretType);
const next = async () => {
  if (step.value === SelectSercretType) {
    step.value = InputForm;
  } else if (step.value === InputForm) {
    const { values } = await handleValidate();
    if (values) {
      console.log(values);
    }
  }
};
const { t } = useI18n();
const SerectTypes = computed(() => [
  {
    title: "MD5",
    content: t("VhHMY_sr-L5bicsHqZ3EM"),
  },
  {
    title: "RSA",
    content: t("gomoOFSdvm27SwRWOowkR"),
  },
]);
const activeKey = ref("MD5");

const formState = reactive({
  authCode: undefined,
  secretKey: undefined,
});

const { GoogleAuthCodeRule, secretKeyRule } = useFormRules();

const rules = reactive({
  authCode: GoogleAuthCodeRule,
  secretKey: secretKeyRule,
});

const { handleValidate, validateInfos } = useForm(formState, rules);
</script>

<template>
  <div class="p-2">
    <transition name="slide-page" mode="out-in">
      <div :key="step">
        <div v-if="step === 1" class="flex flex-col gap-y-4">
          <template v-for="serectType in SerectTypes" :key="serectType.title">
            <div
              class="bg-gray-50 px-4 py-2 rounded"
              :class="[activeKey === serectType.title ? 'active' : 'deactive']"
              @click="activeKey = serectType.title"
            >
              <CheckOutlined class="check" />
              <h3>{{ serectType.title }}</h3>
              <p>
                {{ serectType.content }}
              </p>
            </div>
          </template>
        </div>
        <div v-if="step === 2">
          <AForm layout="vertical">
            <AFormItem
              v-bind="validateInfos.secretKey"
              :label="$t('1vtSf_CqxwRTUPy7xfMwm')"
            >
              <AInput
                v-model:value="formState.secretKey"
                :placeholder="$t('03T3p-NHnHL3nDxk9xYof')"
              ></AInput>
            </AFormItem>
            <AFormItem
              v-bind="validateInfos.authCode"
              :label="$t('SlJFgfv49xSHi9mbjdw4e')"
            >
              <AInput
                v-model:value="formState.authCode"
                :placeholder="$t('0A89nPyaGbq5-v9reFOzw')"
              ></AInput>
            </AFormItem>
          </AForm>
        </div>
        <div class="text-center mt-4">
      <a-button @click="next" type="primary">
        {{
          step === SelectSercretType
            ? $t("dkRiXkPIS0oKMtvCefl8N")
            : $t("utkQ-uv-4gXBHkFXvGL5u")
        }}
      </a-button>
    </div>
      </div>
    </transition>

  </div>
</template>

<style scoped lang="less">
.active {
  border: 1px solid var(--primary);
  position: relative;

  .check {
    background-color: var(--primary);
    position: absolute;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -12px;
    top: -12px;
    padding: 4px;
    color: white;
    border: 1px solid var(--primary);
    border-radius: 50%;
  }
}

.deactive {
  border: 1px solid var(--gray);
  .check {
    display: none;
  }
}
</style>
