<script setup lang="ts">
import { useList } from "@/hooks/useList";
import { loadMember, searchMemberByCardNo } from "@/api/member";
import MemberList from "./components/MemberList.vue";
import MemberCard from "./components/MemberCard.vue";
import { useDrawerInject, MEMBER_TRANSFER } from "@/hooks/useDrawer";
import Transfer from "./components/actions/Transfer.vue";
import { useAppStore } from "@/stores/app";
import { debounce } from "lodash-es";
import { AutoComplete } from "ant-design-vue";
import { SelectHandler } from "ant-design-vue/es/vc-select/Select";

const memberFilterOptions: Record<string, any> = reactive({
  emailLike: undefined,
  nameLike: undefined,
});

const dynamicSearch = ref("emailLike");
const {
  list: dataSource,
  fetch: fetchMember,
  loading: memberLoading,
  fetchMore,
} = useList(loadMember, memberFilterOptions, {
  mode: "list",
  immediate: true,
});

const uuid = ref<string>("");

const { drawerPattern, wrapClick } = useDrawerInject();
const appStore = useAppStore();

// 获得列表数据时渲染第一个成员的卡片
if (!appStore.isMobile) {
  const stopWatch = watch(
    () => dataSource.value,
    (newVal) => {
      if (newVal) {
        uuid.value = newVal[0].uuid;
        stopWatch();
      }
    }
  );
}
const router = useRouter();

const onMemberListItemClick = (id: string) => {
  if (appStore.isMobile) {
    router.push({ name: "MemberCard", params: { uuid: id } });
  } else {
    uuid.value = id;
  }
};

const inputOption = ref("Email");
const handleInputMenuClick = (key: string) => {
  memberFilterOptions[dynamicSearch.value] = undefined;
  if (key === "Email") {
    dynamicSearch.value = "emailLike";
    inputOption.value = "Email";
  } else {
    dynamicSearch.value = "nameLike";
    inputOption.value = "Name";
  }
};

const searchOptions = ref<any>([]);

let isSearching = ref(false);
let controller: AbortController;
const searchText = ref();

const onSearch = debounce(async (value: string) => {
  if (!value) {
    return;
  }
  isSearching.value && controller?.abort();
  controller = new AbortController();
  searchOptions.value = [];
  try {
    isSearching.value = true;
    const searchMemberByCardNoFlag = value.length === 4;

    let searchRes;
    if (searchMemberByCardNoFlag) {
      searchRes = await Promise.all([
        loadMember({ emailLike: value, pageID: 1, pageSize: 10 }, controller),
        loadMember({ nameLike: value, pageID: 1, pageSize: 10 }, controller),
        searchMemberByCardNo({ cardNoLike: value }, "PPC", controller),
        searchMemberByCardNo({ cardNoLike: value }, "VCC", controller),
      ]);
    } else {
      searchRes = await Promise.all([
        loadMember({ emailLike: value, pageID: 1, pageSize: 10 }, controller),
        loadMember({ nameLike: value, pageID: 1, pageSize: 10 }, controller),
      ]);
    }

    const optionConvert = (
      options: any,
      type: string,
      cardType?: "PPC" | "VCC"
    ) =>
      options?.map((item: any) => {
        const { uuid, email, username } = item;
        let maskCardNo = item.mask_card_no;

        return {
          value: uuid,
          type,
          cardType,
          email,
          username,
          maskCardNo,
        };
      });

    const [emailRes, nameRes, ppcRes, vccRes] = searchRes;

    const userOptions = optionConvert(
      [...emailRes.content, ...nameRes.content],
      "user"
    );

    let cardOptions: any[] = [];

    if (ppcRes && vccRes) {
      cardOptions = [
        ...optionConvert(ppcRes.content, "card", "PPC"),
        ...optionConvert(vccRes.content, "card", "VCC"),
      ];
    }

    userOptions.length &&
      searchOptions.value.push({
        value: "User",
        options: userOptions,
      });
    cardOptions.length &&
      searchOptions.value.push({
        value: "Card",
        options: cardOptions,
      });
  } catch (err) {
    console.log(err);
  } finally {
    isSearching.value = false;
  }
}, 500);

const tabKey = ref<string>();
const onSelect: SelectHandler = (value: string, option: any) => {
  uuid.value = value;
  if (option.cardType) {
    tabKey.value = option.cardType;
  }
};
</script>

<template>
  <!-- popupClassName写在global.less才能使其生效 -->
  <div class="bg-white p-4 rounded-xl mb-2">
    <AutoComplete
      style="width: 300px"
      :options="searchOptions"
      @search="onSearch"
      @select="onSelect"
      popupClassName="member-search-popup"
    >
      <!-- @vue-ignore #option unknown error , no solution in antd issue  -->
      <template #option="item">
        <template v-if="item.options">
          <div>
            {{ item.value }}
          </div>
        </template>
        <template v-if="item.type === 'user'">
          <div class="flex justify-between">
            <div><MailOutlined class="mr-1" />{{ item.email }}</div>
            <div><UserOutlined class="mr-1" />{{ item.username || "--" }}</div>
          </div>
        </template>
        <template v-if="item.type === 'card'">
          <div>
            <div class="flex justify-between">
              <div><MailOutlined class="mr-1" />{{ item.email }}</div>
              <div>
                <UserOutlined class="mr-1" />{{ item.username || "--" }}
              </div>
            </div>

            <div>
              <span v-if="item.cardType === 'PPC'">
                <CreditCardFilled />
              </span>
              <span v-else-if="(item.cardType = 'VCC')">
                <CreditCardOutlined />
              </span>
              {{ item.maskCardNo }}
            </div>
          </div>
        </template>
      </template>

      <AInputSearch
        placeholder="支持郵箱、姓名和卡尾號搜索"
        :loading="isSearching"
        v-model:value="searchText"
        enter-button
        :allow-clear="false"
      />
    </AutoComplete>
  </div>
  <div class="flex h-full relative gap-x-4">
    <div class="flex-grow pr-4 bg-white p-4 rounded-xl">
      <ComponentTitle :title="$t('DJA8mXTnjyyt6SpiAbvhO')" class="mb-4">
        <template #extra>
          <div class="flex gap-x-2" v-if="!appStore.isMobile">
            <a-input
              allow-clear
              :placeholder="$t('OcfJlH4QmIPpM8_XAtT0h')"
              v-model:value="memberFilterOptions[dynamicSearch]"
              @keyup.enter="() => fetchMember({ noAppend: true })"
            >
              <template #prefix>
                <ADropdown trigger="click">
                  <a class="text-primary">
                    {{ inputOption }}
                    <DownOutlined />
                  </a>
                  <template #overlay>
                    <AMenu
                      @click="({key})=>handleInputMenuClick(key as string)"
                    >
                      <AMenuItem key="Email">Email</AMenuItem>
                      <AMenuItem key="Name">Name</AMenuItem>
                    </AMenu>
                  </template>
                </ADropdown>
                <!-- <SearchOutlined /> -->
              </template>
            </a-input>
            <a-button
              type="primary"
              @click="wrapClick(MEMBER_TRANSFER)"
              :disabled="drawerPattern === MEMBER_TRANSFER"
            >
              {{ $t("_iMQNMQatEhTi4yWkEjxs") }}
            </a-button>
          </div>
        </template>
      </ComponentTitle>

      <AInput
        v-if="appStore.isMobile"
        class="mb-4"
        allow-clear
        :placeholder="$t('OcfJlH4QmIPpM8_XAtT0h')"
        v-model:value="memberFilterOptions[dynamicSearch]"
        @keyup.enter="() => fetchMember({ noAppend: true })"
      >
        <template #prefix>
          <ADropdown trigger="click">
            <a class="text-primary">
              {{ inputOption }}
              <DownOutlined />
            </a>
            <template #overlay>
              <AMenu @click="({key})=>handleInputMenuClick(key as string)">
                <AMenuItem key="Email">Email</AMenuItem>
                <AMenuItem key="Name">Name</AMenuItem>
              </AMenu>
            </template>
          </ADropdown>
          <!-- <SearchOutlined /> -->
        </template>
      </AInput>
      <!-- <a-input
        v-if="appStore.isMobile"
        class="mb-4"
        allow-clear
        :placeholder="$t('OcfJlH4QmIPpM8_XAtT0h')"
        v-model:value="memberFilterOptions.emailLike"
        @keyup.enter="() => fetchMember()"
      >
        <template #prefix>
          <SearchOutlined />
        </template>
      </a-input> -->

      <MemberList
        :dataSource="dataSource"
        :loading="memberLoading"
        @click="(id) => onMemberListItemClick(id)"
        @fetchMore="fetchMore"
        :activeUUID="uuid"
        :isMobile="appStore.isMobile"
      />
    </div>

    <div
      class="basis-[350px] shrink-0 bg-white rounded-xl"
      v-if="!appStore.isMobile"
    >
      <MemberCard :uuid="uuid" v-model:tabKey="tabKey" />
    </div>

    <ExDrawer :open="drawerPattern === MEMBER_TRANSFER" :title="$t('7czJid2WhXi6cEvGTtQXo')">
      <Transfer />
    </ExDrawer>
  </div>
</template>
