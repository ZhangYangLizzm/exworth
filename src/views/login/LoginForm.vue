<script setup>
import { login } from "@/api/user";
import { message } from "ant-design-vue";
import { useForm } from "@/libs/hooks/useForm";
import GraphValidateCodeImage from "@/components/GraphValidateCodeImage";
import { nextTick } from "vue";
const { t } = useI18n();

const formState = reactive({
  name: undefined,
  password: undefined,
});
const rules = computed(() => ({
  name: [{ required: true, message: t("8dRn48_9RTO6Q2804fgFp") }],
  password: [{ required: true, message: t("8dRn48_9RTO6Q2804fgFp") }],
  code: [
    { required: true, message: t("8dRn48_9RTO6Q2804fgFp") },
    { len: 4, message: t("cWWvrwCrLJY6luPt-0_h8") },
  ],
}));
const loading = ref(false);

const emit = defineEmits(["reset", "mfa"]);

const { handleValidate, validateInfos } = useForm(formState, rules);

const router = useRouter();
const validateCode = ref(false);
const graphCode = ref();
const handleSubmit = async () => {
  const { values } = await handleValidate(
    validateCode.value ? ["name", "password", "code"] : ["name", "password"]
  );
  if (values) {
    loading.value = true;
    const { statusCode, content } = await login({
      ...values,
      name: values.name.toUpperCase(),
    });
    loading.value = false;
    if (statusCode === 200) {
      const {
        // need mfa
        ifCheckGoogleSecretKey,
        // need bind mfa
        ifGoogleSecretKeyBound,
        // first login
        ifFirstLogin,
        name,
      } = content;
      if (ifCheckGoogleSecretKey) {
        if (ifGoogleSecretKeyBound) {
          if (ifFirstLogin) {
            emit("reset", name);
          } else {
            emit("mfa");
          }
        } else {
          message.warning(t("8jnmiDecv_inomSIVKpDF"));
        }
      } else {
        if (ifFirstLogin) {
          // reset password
          emit("reset", name);
        } else {
          router.replace({ name: "Dashboard" });
        }
      }
    } else {
      if (content.codeFlag) {
        validateCode.value = true;
        nextTick(() => {
          graphCode.value.refreshCode();
        });
      }
    }
  }
};
</script>
<template>
  <a-form class="mx-auto max-w-[368px]">
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

    <template v-if="validateCode">
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
          <GraphValidateCodeImage ref="graphCode" />
        </a-form-item>
      </a-form-item>
    </template>

    <a-button
      type="primary"
      size="large"
      @click="handleSubmit"
      block
      :loading="loading"
    >
      {{ $t("0qjtHGUfIBLV4LzHX8WWD") }}
    </a-button>
  </a-form>
</template>
