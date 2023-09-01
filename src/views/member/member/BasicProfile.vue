<script setup>
import ComponentTitle from "@/components/ComponentTitle.vue";
import ExModal from "@/libs/components/antd/modal/ExModal.vue";
import { useForm } from "@/libs/hooks/useForm";
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
import { useAccountStore } from "@/stores/modules/accounts.js";
import { Format } from "@/libs/hooks/useUtil.js";
import useClipboard from "@/hooks/useClipboard.js";
import { postMemberTransfer } from "@/api/wallet";
import { useAppStore } from "@/libs/stores/modules/app";
import useFormRules from "@/hooks/useFormRules.js";
const appStore = useAppStore();

const { copy } = useClipboard();
const props = defineProps({
  profile: {
    type: Object,
    default: () => ({}),
  },
});
const accountStore = useAccountStore();
const route = useRoute();
const modalRef = ref();

const handleClick = () => {
  modalRef?.value.show();
};
const transferState = reactive({
  currency: props.initialCurrency || "USDE",
  amount: undefined,
  password: "",
  authCode: "",
});

const available = computed(() =>
  accountStore.availableBalance(transferState.currency)
);

const {
  CurrencyRule,
  getAmountRule,
  SecurityPasswordRule,
  GoogleAuthCodeRule,
} = useFormRules();
const AmountRule = computed(() => getAmountRule(available.value));
const rules = reactive({
  currency: CurrencyRule,
  amount: AmountRule,
  password: SecurityPasswordRule,
  authCode: GoogleAuthCodeRule,
});

const { resetFields, validateInfos, handleValidate } = useForm(
  transferState,
  rules
);

const transferConfirmLoading = ref(false);

const handleTransfer = async () => {
  const { values } = await handleValidate();
  if (values) {
    transferConfirmLoading.value = true;
    await postMemberTransfer({ uuid: route.params.uuid, ...transferState });
    await accountStore.fetchWalletAccount();
    transferConfirmLoading.value = false;
    modalRef.value?.close();
    resetFields();
  }
};
</script>
<template>
  <div class="p-4 rounded shadow">
    <div class="flex items-end justify-between">
      <div class="grow">
        <ComponentTitle :text="$t('fl9JwgO1UOla0ZUK0NjAl')" />
        <div class="max-w-[800px] flex justify-between w-full flex-wrap">
          <div>
            {{ $t("SreiC9yRSXuJ0EDsT5t0z") }}: {{ profile.email
            }}<span
              ><copy-outlined
                class="cursor-pointer ml-2"
                @click="copy(profile.email)"
            /></span>
          </div>
          <div v-if="profile.fullName">
            {{ $t("Zb57X_a6-Ikylh5coBdYs") }} : {{ profile.fullName }}
          </div>
        </div>
      </div>
      <a-button type="primary" @click="handleClick">
        {{ $t("_iMQNMQatEhTi4yWkEjxs") }}
      </a-button>
    </div>

    <ExModal
      :customTitle="$t('pGrhTXj8A84ieJpHf6k3L')"
      ref="modalRef"
      :isMobile="appStore.isMobile"
    >
      <div class="p-4">
        <a-form layout="vertical" :rules="rules">
          <a-form-item :label="$t('tOfYePGWd06TTHZ9HxG5V')" required>
            <a-input
              autocomplete="off"
              disabled
              :placeholder="route.params.uuid"
            />
          </a-form-item>
          <a-form-item :label="$t('AMeo68ZI28aaFVqr0swF7')" required>
            <CurrencySelect
              :walletAccounts="accountStore.walletAccounts"
              v-model:value="transferState.currency"
            />
          </a-form-item>
          <a-form-item
            v-bind="validateInfos.amount"
            :label="$t('aT1xkA__dmUFiEHrDNAph')"
          >
            <a-input
              autocomplete="off"
              :placeholder="$t('sMkxYlIlj4SgxGAKFOjgJ')"
              v-model:value="transferState.amount"
            />
            <AmountLabel
              :title="$t('e8DgaMG0nnSK1cxzTVxp1')"
              :amount="Format(available)"
              :currency="transferState.currency"
            />
          </a-form-item>
          <a-form-item
            :label="$t('yj74dO9iA9rD0NRDm8h2n')"
            v-bind="validateInfos.password"
          >
            <a-input-password
              :placeholder="$t('L8_JRGabLnJGC2tBI9Hqc')"
              v-model:value="transferState.password"
            />
          </a-form-item>
          <a-form-item
            :label="$t('SlJFgfv49xSHi9mbjdw4e')"
            v-bind="validateInfos.authCode"
          >
            <a-input-password
              :placeholder="$t('RN0u-0ie4LuZ1u5aetix9')"
              v-model:value="transferState.authCode"
            />
          </a-form-item>
        </a-form>
      </div>
      <template #footer>
        <div class="px-4">
          <div
            class="flex justify-center py-4 border-t border-b-0 border-gray-200 border-solid border-x-0 gap-x-2"
          >
            <a-button
              type="primary"
              @click="handleTransfer"
              :loading="transferConfirmLoading"
            >
              {{ $t("utkQ-uv-4gXBHkFXvGL5u") }}
            </a-button>
          </div>
        </div>
      </template>
    </ExModal>
  </div>
</template>
