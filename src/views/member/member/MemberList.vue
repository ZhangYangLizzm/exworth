<script setup>
import { useList } from "@/libs/hooks/useList";
import { loadMember } from "@/api/member";
import { useAppStore } from "@/libs/stores/modules/app";
import MobileList from "./mobile/MobileList.vue";
import WebTable from "./web/WebTable.vue";

const appStore = useAppStore();

const filterOptions = reactive({
  emailLike: undefined,
});

const {
  list: dataSource,
  fetch,
  loading,
  pageID,
  totalCount,
  onPageChange,
} = useList(loadMember, filterOptions);

onMounted(() => {
  fetch();
});
</script>

<template>
  <!-- 成員列表 -->
  <div class="p-4">
    <a-form layout="inline">
      <a-form-item :class="[isMobile ? 'w-full' : '']">
        <a-input
          autocomplete="off"
          :placeholder="$t('OcfJlH4QmIPpM8_XAtT0h')"
          v-model:value="filterOptions.emailLike"
          @keyup.enter="fetch"
        >
          <template #prefix>
            <search-outlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="fetch" v-if="!appStore.isMobile">{{
          $t("5NZo0upHiGpgDPaM_E9iu")
        }}</a-button>
      </a-form-item>
    </a-form>

    <div class="mt-4">
      <MobileList
        :dataSource="dataSource"
        :loading="loading"
        :isMobile="appStore.isMobile"
      />
      <WebTable
        :dataSource="dataSource"
        :loading="loading"
        :isMobile="appStore.isMobile"
      />
      <a-pagination
        hideOnSinglePage
        class="g-pagination"
        size="small"
        :current="pageID"
        :total="totalCount"
        show-less-items
        @change="onPageChange"
      />
    </div>
  </div>
</template>
