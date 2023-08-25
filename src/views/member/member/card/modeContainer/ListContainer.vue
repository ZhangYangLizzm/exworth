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
    title: t("J_niWZulhSbsTsEikV9VK"),
    dataIndex: "cardBalance",
    key: "cardBalance",
    align: "center",
  },
  {
    title: t("r8FVvX5IM4qjwRg1sseqI"),
    dataIndex: "cardStatus",
    key: "cardStatus",
    align: "center",
  },
  {
    title: t("83m2iEu_UmMs1X_pFk6Uq"),
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
        <Card :brand="record.cardType" :mode="CARD_MODE_PHYSICAL" class="h-32 w-64" size="small">
          <template #footer>
            <div class="flex items-center justify-between">
              <div class="drop-shadow">
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
        <!-- <a-dropdown>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="onClick(record, 'recharge')">
                {{ $t("10QBrQYST8DUjmNhn5e4_") }}</a-menu-item
              >
              <a-menu-item key="2" @click="onClick(record, 'replace')">
                {{ $t("gVPkNpXqcOdkRBKMOR_9i") }}
              </a-menu-item>
              <a-menu-item key="3" @click="onClick(record, 'cardLoss')">
                {{ $t("h0EQGD5w6L9xSdGkk4eG0") }}
              </a-menu-item>
              <a-menu-item key="4" @click="onClick(record, 'history')">
                {{ $t("jQc6AAJLq2w_8X55HDOoe") }}
              </a-menu-item>
            </a-menu>
          </template>
          <a-button>
            {{ $t("vtYWVfIOk8Ldw8AtYOjq9") }}
            <DownOutlined />
          </a-button>
        </a-dropdown> -->
        <a-button type="link" v-if="[CARD_STATUS_NORMAL].includes(record?.cardStatus)"
          @click="onClick(record, 'recharge')">
          {{ t("VVQaPte21XgxJXEM9H8gu") }}
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
