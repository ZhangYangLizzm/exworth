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
  email: undefined,
  status: undefined,
});

//TODO：需要邀请记录的列表接口
const {
  list: _list,
  fetch,
  loading,
  pageID,
  totalCount,
  onPageChange,
} = useList(loadInvitation, filterOptions);

const list = [
  {
    id: 1,
    email: "lichin.it@gmail.com",
    status: MEMBER_INVITATION_STATUS_INVITED,
  },
  {
    id: 2,
    email: "xk@exworth.group",
    status: MEMBER_INVITATION_STATUS_JOINED,
  },
];

const modalRef = ref();

const formState = reactive({
  email: [],
});

const arrayValidator = async (_, value) => {
  if (value.length === 0) {
    return Promise.reject(t("8dRn48_9RTO6Q2804fgFp"));
  }
  return Promise.resolve();
};
const rules = computed(() => ({
  email: [{ required: true, message: t("8dRn48_9RTO6Q2804fgFp") }],
}));
const { handleValidate, validateInfos, resetFields } = useForm(
  formState,
  rules
);

const btnLoading = ref(false);

// TODO：邀请成员加入接口
const handleSubmit = () => {
  // select 失去焦点需要时间
  setTimeout(async () => {
    const { values } = await handleValidate();
    if (values) {
      btnLoading.value = true;
      const { statusCode } = await invite(values);
      btnLoading.value = false;
      if (statusCode === 200) {
        handleCancel();
        fetch();
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
            :placeholder="t('HdqCyzznm7hS5EZblV5Xr')"
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
    </template>
    <template v-else>
      <a-form layout="inline" class="grow">
        <a-form-item>
          <a-input
            :placeholder="t('HdqCyzznm7hS5EZblV5Xr')"
            class="mr-2"
            v-model:value="filterOptions.email"
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
      </a-form>
      <a-button
        @click="modalRef?.show()"
        type="primary"
        class="float-right my-2"
      >
        {{ $t("VPTp-QATJSurGdzHeGrXT") }}
      </a-button>
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
        class="float-right my-2"
        :current="pageID"
        :total="totalCount"
        show-less-items
        @change="onPageChange"
      />
      <a-button
        type="primary"
        @click="modalRef?.show()"
        class="w-full"
        v-if="appStore.isMobile"
        >{{ t("VPTp-QATJSurGdzHeGrXT") }}</a-button
      >
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
              :tokenSeparators="[',', ' ', '，']"
              v-model:value="formState.email"
            >
            </a-select>
          </a-form-item>
          <Tips
            :title="t('1NLFL8YdPqQXonj5lQxvT')"
            :contents="[t('irfv2QgrQafS_6Zl73s2N')]"
          />
          <!-- <div class="font-bold text-red-500">
            {{ $t("1NLFL8YdPqQXonj5lQxvT") }}
          </div>
          <div class="text-[#BFBFBF]">{{ $t("irfv2QgrQafS_6Zl73s2N") }}</div> -->
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
