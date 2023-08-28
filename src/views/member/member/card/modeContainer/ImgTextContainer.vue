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
const { dataSource, loading } = defineProps({
  dataSource: {
    type: Array,
    default: () => [],
  },
  loading: Boolean,
});
const emits = defineEmits(["onClick"]);
const onClick = (item, type) => {
  emits("onClick", { item, type });
};
</script>

<template>
  <a-spin :spinning="loading">
    <div class="flex pb-4 overflow-x-auto overflow-y-auto gap-x-4">
      <div class="bg-white shrink-0 rounded-2xl" v-for="(item, index) in dataSource"
        :class="[appStore.isMobile ? 'basis-4/5' : 'basis-[280px]']" :key="index">
        <Card :brand="item.cardType" :mode="CARD_MODE_PHYSICAL">
          <template #footer>
            <div class="flex items-center justify-between">
              <div class="drop-shadow text-[20px]">
                {{ encryptStr(item?.maskCardNo, 4, 4, " **** **** ") }}
              </div>
              <a-badge :status="CARD_STATUS_BADGE_MAP(item?.cardStatus)" :text="CARD_STATUS_TEXT(item?.cardStatus)" />
            </div>
          </template>
        </Card>
        <div class="flex p-2">
          <a-button type="text" v-if="[CARD_STATUS_NORMAL].includes(item?.cardStatus)" @click="onClick(item, 'recharge')">
            {{ $t("VVQaPte21XgxJXEM9H8gu") }}
          </a-button>
          <a-button type="text" @click="onClick(item, 'replace')">
            <!-- v-if="[CARD_STATUS_BINDING].includes(item?.cardStatus)" -->

            {{ $t("gVPkNpXqcOdkRBKMOR_9i") }}
          </a-button>
          <a-button type="text" @click="onClick(item, 'cardLoss')">
            {{ $t("h0EQGD5w6L9xSdGkk4eG0") }}
          </a-button>
          <!-- <a-button type="text" @click="onClick(item, 'history')">
          {{ $t("jQc6AAJLq2w_8X55HDOoe") }}
        </a-button> -->
        </div>
      </div>
    </div>
  </a-spin>
</template>
