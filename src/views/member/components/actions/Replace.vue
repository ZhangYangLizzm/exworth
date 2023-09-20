<script setup lang="ts">
import { postChangeCard } from "@/api/card";
import { useForm } from "@/hooks";
import useFormRules from "@/hooks/useFormRules";

const { CardNoRule, SecurityPasswordRule, GoogleAuthCodeRule } = useFormRules();

const props = defineProps({
  cardInfo: {
    type: Object,
    default: () => ({}),
  },
});

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

const { handleValidate, validateInfos } = useForm(replaceState, rules);

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
  }
};
</script>

<template>
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
      <a-form-item>
        <Tips
          :title="$t('8jNAI-2YZrfU_3AfYF278')"
          :contents="$t('bSCdj2cL-q5p7wrJiuAGw')"
        />
      </a-form-item>

      <a-form-item class="text-center">
        <a-button
          type="primary"
          @click="handleConfirm"
          :loading="btnLoading"
          class="w-40 h-8"
        >
          {{ $t("utkQ-uv-4gXBHkFXvGL5u") }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
