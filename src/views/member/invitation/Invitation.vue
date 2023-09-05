<script setup>
import { useList } from "@/libs/hooks/useList";
import { loadInvitation, invite } from "@/api/member";
import {
  MEMBER_INVITATION_STATUS_JOINED,
  MEMBER_INVITATION_STATUS_INVITED,
} from "@/stores/models/member";
import { useMember } from "@/stores/modules/member";
import ExModal from "@/libs/components/antd/modal/ExModal.vue";
import { useAppStore } from "@/stores/modules/app";
import { useForm } from "@/libs/hooks/useForm";
import { emailPattern } from "@/hooks/useFormRules";
import { notification } from "ant-design-vue";
import { h } from "vue";

const appStore = useAppStore();

const { t } = useI18n();

const { MEMBER_INVITATION_STATUS_TEXT, MEMBER_INVITATION_STATUS_BADGE } =
  useMember();

const statusOptions = computed(() =>
  [{ label: t("T8jku5XFeq-1ZPcuDe_7B"), value: undefined }].concat([
    {
      label: MEMBER_INVITATION_STATUS_TEXT(MEMBER_INVITATION_STATUS_JOINED),
      value: MEMBER_INVITATION_STATUS_JOINED,
    },
    {
      label: MEMBER_INVITATION_STATUS_TEXT(MEMBER_INVITATION_STATUS_INVITED),
      value: MEMBER_INVITATION_STATUS_INVITED,
    },
  ])
);

const columns = computed(() => [
  {
    title: t("KrbBTqrNaiFpKSs1Hs3FC"),
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: t("2azhTayaBBC1zqWCc8lq5"),
    dataIndex: "status",
    key: "status",
    align: "center",
  },
]);

const filterOptions = reactive({
  emailLike: undefined,
  status: undefined,
});

const { list, fetch, loading, pageID, totalCount, onPageChange } = useList(
  loadInvitation,
  filterOptions
);

const modalRef = ref();

const formState = reactive({
  email: [],
});

const patternValidator = async (_, value) => {
  if (!emailPattern.test(value.at(-1))) {
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
      const { statusCode, content } = await invite(values);
      btnLoading.value = false;
      if (statusCode === 200) {
        handleCancel();
        fetch();
        const { errorEmail, successEmail } = content;
        // 如果沒有成功的郵箱，即所有都已經重複
        if (!successEmail.length) {
          notification["error"]({
            message: t("uGntxwN9bCIIl8rHovkzb"),
            description: t("5dKvwRq431eKsKdxFOYUd"),
            duration: null,
          });
        } else {
          let errMessageStr;
          if (errorEmail.length) {
            errMessageStr = errorEmail.join(",") + t("7BR30lhX3ii6xmNLqdhNC");
          }
          const successMessageStr =
            t("MGdEJLi0ltaNxYONgZd47") + successEmail.join(",");
          notification["success"]({
            message: t("uGntxwN9bCIIl8rHovkzb"),
            description: () =>
              h("div", [
                errMessageStr ? h("p", null, errMessageStr) : null,
                h("p", null, successMessageStr),
              ]),
            duration: null,
          });
        }
      }
    }
  }, 300);
};
const handleCancel = () => {
  setTimeout(() => {
    resetFields();
    modalRef.value?.close();
  }, 300);
};
onMounted(() => {
  fetch();
});
</script>
<template>
  <div class="p-4">
    <template v-if="appStore.isMobile">
      <a-form>
        <a-form-item>
          <a-input
            :placeholder="$t('HdqCyzznm7hS5EZblV5Xr')"
            v-model:value="filterOptions.email"
            @keyup.enter="fetch"
            allow-clear
          >
            <template #prefix>
              <search-outlined />
            </template>
          </a-input>
        </a-form-item>
      </a-form>
      <a-button
        type="primary"
        @click="modalRef?.show()"
        class="w-full"
        size="large"
        v-if="appStore.isMobile"
        >{{ $t("VPTp-QATJSurGdzHeGrXT") }}</a-button
      >
    </template>
    <template v-else>
      <a-form layout="inline" class="grow">
        <a-form-item>
          <a-input
            :placeholder="$t('HdqCyzznm7hS5EZblV5Xr')"
            class="mr-2"
            v-model:value="filterOptions.emailLike"
            @keyup.enter="fetch"
            allow-clear
          >
            <template #prefix>
              <search-outlined />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-radio-group
            v-model:value="filterOptions.status"
            :options="statusOptions"
            optionType="button"
            @change="fetch"
          />
        </a-form-item>
        <a-form-item>
          <a-button @click="modalRef?.show()" type="primary">
            {{ $t("VPTp-QATJSurGdzHeGrXT") }}
          </a-button>
        </a-form-item>
      </a-form>
    </template>

    <div class="my-4">
      <a-table
        :dataSource="list"
        :columns="columns"
        :pagination="false"
        :loading="loading"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.key === 'status'">
            <a-badge
              :status="MEMBER_INVITATION_STATUS_BADGE(text)"
              :text="MEMBER_INVITATION_STATUS_TEXT(text)"
            />
          </template>
        </template>
      </a-table>
      <a-pagination
        hideOnSinglePage
        class="float-right my-2"
        :current="pageID"
        :total="totalCount"
        show-less-items
        @change="onPageChange"
      />
    </div>

    <ExModal
      ref="modalRef"
      isBottom
      :isMobile="appStore.isMobile"
      :customTitle="$t('VPTp-QATJSurGdzHeGrXT')"
      @beforeClose="resetFields"
    >
      <div class="px-4">
        <a-form
          layout="vertical"
          class="py-4 border-t border-b-0 border-gray-200 border-solid border-x-0"
        >
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
          <Tips
            :title="$t('1NLFL8YdPqQXonj5lQxvT')"
            :contents="$t('irfv2QgrQafS_6Zl73s2N')"
          />
        </a-form>
      </div>
      <template #footer>
        <div class="px-4">
          <div
            class="flex justify-center py-4 border-t border-b-0 border-gray-200 border-solid border-x-0 gap-x-2"
          >
            <a-button @click="handleCancel" size="large">
              {{ $t("cT1QFWPt_d3RzSaZhjCUO") }}
            </a-button>
            <a-button
              type="primary"
              @click="handleSubmit"
              size="large"
              :loading="btnLoading"
            >
              {{ $t("VPTp-QATJSurGdzHeGrXT") }}
            </a-button>
          </div>
        </div>
      </template>
    </ExModal>
  </div>
</template>
