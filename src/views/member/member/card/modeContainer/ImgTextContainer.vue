<script setup>
import Card from "@/core/card/components/card";
import {
  CARD_MODE_PHYSICAL,
  CARD_MODE_VIRTUAL,
  CARD_STATUS_NORMAL,
  CARD_STATUS_BINDING,
  CARD_STATUS_TEXT,
  CARD_STATUS_BADGE_MAP,
} from "@/core/card/stores/models/card";
import { encryptStr } from "@/libs/hooks/useUtil";
import { useAppStore } from "@/libs/stores/modules/app";

const appStore = useAppStore();
defineProps({
  dataSource: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  type: String,
});

const emit = defineEmits(["onClick"]);
const onClick = (item, type, topupMode) => {
  emit("onClick", { item, type, topupMode });
};
</script>

<template>
  <a-spin :spinning="loading">
    <div class="flex pb-4 overflow-x-auto overflow-y-auto gap-x-4">
      <div
        class="bg-slate-100 shrink-0 rounded-xl"
        v-for="(item, index) in dataSource"
        :class="[appStore.isMobile ? 'basis-4/5' : 'basis-[300px]']"
        :key="index"
      >
        <Card :brand="item.cardType" :mode="type">
          <template #footer>
            <div class="flex items-center justify-between">
              <div class="drop-shadow text-[20px]">
                {{ encryptStr(item?.maskCardNo, 4, 4, " **** **** ") }}
              </div>
              <a-badge
                :status="CARD_STATUS_BADGE_MAP(item?.cardStatus)"
                :text="CARD_STATUS_TEXT(item?.cardStatus)"
              />
            </div>
          </template>
        </Card>
        <div class="flex px-2">
          <a-button
            type="text"
            v-if="[CARD_STATUS_NORMAL].includes(item?.cardStatus)"
            @click="onClick(item, 'recharge', type)"
          >
            {{ $t("VVQaPte21XgxJXEM9H8gu") }}
          </a-button>
          <a-button
            type="text"
            @click="onClick(item, 'replace')"
            v-if="type === CARD_MODE_PHYSICAL"
          >
            {{ $t("gVPkNpXqcOdkRBKMOR_9i") }}
          </a-button>
          <a-button
            type="text"
            @click="onClick(item, 'cardLoss')"
            v-if="type === CARD_MODE_PHYSICAL"
          >
            {{ $t("h0EQGD5w6L9xSdGkk4eG0") }}
          </a-button>
        </div>
      </div>
    </div>
  </a-spin>
</template>
