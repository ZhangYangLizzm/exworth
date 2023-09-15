<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const selectedKeys = computed(() => [...route.matched.map((i) => i.name)]);
const handleMenuClick = ({ key }: { key: string }) => {
  router.push({ name: key });
};
</script>

<template>
  <AMenu @click="handleMenuClick" :selectedKeys="selectedKeys">
    <AMenuItem class="rounded" key="Wallet">
      <template #icon>
        <wallet-outlined />
      </template>
      {{ $t("JMrHbl_ei1CFmRIw8N60f") }}
    </AMenuItem>

    <AMenuItem class="rounded" key="Member">
      <template #icon>
        <user-outlined />
      </template>
      {{ $t("DJA8mXTnjyyt6SpiAbvhO") }}
    </AMenuItem>

    <AMenuItem class="rounded" key="Invitation">
      <template #icon>
        <SvgIcon name="member-invitation" class="w-[14px] h-[14px]"></SvgIcon>
      </template>
      {{ $t("6e9lOmW7RuhrqYotHMpJ8") }}
    </AMenuItem>

    <AMenuItem class="rounded" key="Setting">
      <template #icon>
        <setting-outlined />
      </template>
      {{ $t("tn1dw0_d4hpGoJZiMaCjB") }}
    </AMenuItem>
  </AMenu>
</template>

<style scoped lang="less"></style>
