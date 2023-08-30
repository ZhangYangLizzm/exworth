<script setup>
import { postChangeCard } from "@/api/card";
import ExModal from "@/libs/components/antd/modal/ExModal.vue";
import { useAppStore } from "@/libs/stores/modules/app";
import useFormRules from "@/hooks/useFormRules.js";
const { CardNoRule, SecurityPasswordRule, GoogleAuthCodeRule } = useFormRules();

const appStore = useAppStore();

const props = defineProps({
  cardInfo: {
    type: Object,
    default: () => ({}),
  },
});
const { t } = useI18n();

const rules = reactive({
  newCardKey: CardNoRule,
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule,
});
const replaceState = reactive({
  newCardKey: "",
  password: "",
  authCode: "",
});

const { resetFields, handleValidate, validateInfos } = useForm(
  replaceState,
  rules
);

const modalRef = ref();

const show = () => {
  modalRef?.value.show();
};
defineExpose({ show });

const handleCancel = () => {
  modalRef?.value.close();
};

const btnLoading = ref(false);
const handleConfirm = async () => {
  const { values } = await handleValidate();
  if (values) {
    btnLoading.value = true;
    await postChangeCard({
      ...replaceState,
      oldCardkey: props.cardInfo.cardKey,
    });
    btnLoading.value = false;
    modalRef?.value.close();
  }
};
</script>

<template>
  <ExModal
    :customTitle="$t('gVPkNpXqcOdkRBKMOR_9i')"
    ref="modalRef"
    :isMobile="appStore.isMobile"
  >
    <div class="px-4">
      <a-form layout="vertical" :rules="rules">
        <a-form-item :label="$t('JGMmRjIFXA9BpazlDrQQr')">
          <a-input
            autocomplete="off"
            disabled
            :placeholder="props.cardInfo.maskCardNo"
          >
          </a-input>
        </a-form-item>
        <a-form-item
          :label="$t('Haq1op8REl1tV-OrgcFFA')"
          v-bind="validateInfos.newCardKey"
        >
          <a-input
            autocomplete="off"
            :placeholder="$t('TyYIPcHZX7JYtUZtDeM8Q')"
            v-model:value="replaceState.newCardKey"
          >
          </a-input>
        </a-form-item>
        <a-form-item
          :label="$t('yj74dO9iA9rD0NRDm8h2n')"
          v-bind="validateInfos.password"
        >
          <a-input-password
            :placeholder="$t('g-CkGyBqori4UAmxL4HS5')"
            v-model:value="replaceState.password"
          />
        </a-form-item>
        <a-form-item
          :label="$t('SlJFgfv49xSHi9mbjdw4e')"
          class="flex-col"
          v-bind="validateInfos.authCode"
        >
          <a-input-password
            :placeholder="$t('0A89nPyaGbq5-v9reFOzw')"
            v-model:value="replaceState.authCode"
          />
        </a-form-item>
      </a-form>
      <Tips
        :title="$t('8jNAI-2YZrfU_3AfYF278')"
        :contents="$t('bSCdj2cL-q5p7wrJiuAGw')"
      />
    </div>

    <template #footer>
      <div class="px-4">
        <div
          class="flex justify-center py-4 border-t border-b-0 border-gray-200 border-solid border-x-0 gap-x-2"
        >
          <a-button @click="handleCancel">
            {{ $t("cT1QFWPt_d3RzSaZhjCUO") }}
          </a-button>
          <a-button type="primary" @click="handleConfirm" :loading="btnLoading">
            {{ $t("utkQ-uv-4gXBHkFXvGL5u") }}
          </a-button>
        </div>
      </div>
    </template>
  </ExModal>
</template>
