<script setup lang="ts">
import { useForm } from "@/hooks/useForm";
import { login } from "@/api/user";

const { t } = useI18n();
const formState = reactive({
  name: undefined,
  password: undefined,
});

const rules = computed(() => ({
  name: [{ required: true, message: t("8dRn48_9RTO6Q2804fgFp") }],
  password: [{ required: true, message: t("8dRn48_9RTO6Q2804fgFp") }],
}));

const { handleValidate, validateInfos } = useForm(formState, rules);

const loading = ref(false);
const validateCode = ref(false);
const router = useRouter();
const handleSubmit = async () => {
  const { values } = await handleValidate(
    validateCode.value ? ["name", "password", "code"] : ["name", "password"]
  );
  if (values) {
    loading.value = true;
    await login({
      ...values,
      name: values.name.toUpperCase(),
    });
    loading.value = false;
    router.replace({ path: "/wallet" });
  }
};
</script>

<template>
  <a-form>
    <a-form-item v-bind="validateInfos.name">
      <a-input
        autocomplete="off"
        size="large"
        :placeholder="$t('9_hTi5b-d57f8pixLc20n')"
        v-model:value="formState.name"
      >
        <template #prefix>
          <user-outlined type="user" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item v-bind="validateInfos.password">
      <a-input-password
        size="large"
        :placeholder="$t('lg7GsvW9iI8NEF1TDTuxm')"
        v-model:value="formState.password"
        @keyup.enter="handleSubmit"
      >
        <template #prefix>
          <lock-outlined />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item class="text-center" size="large">
      <a-button type="primary" @click="handleSubmit" :loading="loading">
        {{ $t("0qjtHGUfIBLV4LzHX8WWD") }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="less"></style>
