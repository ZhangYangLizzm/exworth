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
import { Format } from "@/libs/hooks/useUtil.js";
import { useI18n } from "vue-i18n";

defineProps({
  dataSource: {
    type: Array,
    default: () => [],
  },
  loading: Boolean,
});
const emit = defineEmits(["onClick"]);
const onClick = (item, type) => {
  emit("onClick", { item, type });
};
const { t } = useI18n();
const columns = [
  {
    title: t("OnPSpwMATKuG2io4jQP3a"),
    dataIndex: "card",
    key: "card",
  },
  {
    title: t("JAGXkKeKz7Pyk4ozUgvwX"),
    dataIndex: "cardCurrency",
    key: "cardCurrency",
    align: "center",
  },
  {
    title: t("r8FVvX5IM4qjwRg1sseqI"),
    dataIndex: "cardStatus",
    key: "cardStatus",
    align: "center",
  },
  {
    title: t("c9v0NvMxo7MffTy-TXDir"),
    dataIndex: "actions",
    key: "actions",
    align: "right",
  },
];
</script>

<template>
  <a-table :dataSource="dataSource" :columns="columns" :loading="loading">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'card'">
        <Card
          :brand="record.cardType"
          :mode="CARD_MODE_PHYSICAL"
          class="w-64"
          size="small"
        >
          <template #footer>
            <div class="flex items-center justify-between">
              <div class="drop-shadow text-[18px]">
                {{ encryptStr(record?.maskCardNo, 4, 4, " **** **** ") }}
              </div>
            </div>
          </template>
        </Card>
      </template>
      <template v-else-if="column.dataIndex === 'cardBalance'">
        {{ Format(record.cardBalance) }}
      </template>
      <template v-if="column.key === 'cardStatus'">
        <span>
          {{ CARD_STATUS_TEXT(record.cardStatus) }}
        </span>
      </template>
      <template v-if="column.key === 'actions'">
        <a-button
          type="link"
          v-if="[CARD_STATUS_NORMAL].includes(record?.cardStatus)"
          @click="onClick(record, 'recharge')"
        >
          {{ $t("VVQaPte21XgxJXEM9H8gu") }}
        </a-button>
        <a-button type="link" @click="onClick(record, 'replace')">
          {{ $t("gVPkNpXqcOdkRBKMOR_9i") }}
        </a-button>
        <a-button type="link" @click="onClick(record, 'cardLoss')">
          {{ $t("h0EQGD5w6L9xSdGkk4eG0") }}
        </a-button>
      </template>
    </template>
  </a-table>
</template>
