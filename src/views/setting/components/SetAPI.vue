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

const SerectTypes = computed(() => [
  {
    title: "MD5",
    content:
      "使用MD5對稱加密方式運作，您將獲得API密鑰和MD5密鑰。請將API密鑰和MD5密鑰視為密碼一樣妥善保管，切勿與任何第三方分享。",
  },
  {
    title: "RSA",
    content:
      "使用Sign或RSA非對稱加密方式運作。您將獲得API密鑰，切必須通過軟件，自行創建一對公鑰和私鑰，然後僅向Exworth提供公鑰。請將API密鑰和私鑰視為密碼一樣妥善保管，切勿與任何第三方分享。",
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
        <AFormItem v-bind="validateInfos.secretKey" label="密鑰">
          <AInput
            v-model:value="formState.secretKey"
            placeholder="請輸入密鑰"
          ></AInput>
        </AFormItem>
        <AFormItem v-bind="validateInfos.authCode" label="谷歌驗證碼">
          <AInput
            v-model:value="formState.authCode"
            placeholder="輸入谷歌驗證碼"
          ></AInput>
        </AFormItem>
      </AForm>
    </div>
    <div class="text-center mt-4">
      <a-button @click="next" type="primary">下一步 / 確認</a-button>
    </div>
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
