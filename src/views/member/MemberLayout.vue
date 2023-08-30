<script setup></script>

<template>
  <div class="flex">
    <div class="flex text-[1rem]">
      <router-link
        :to="{ name: 'MemberList' }"
        active-class="active-link"
        class="custom-link flex-1 text-center mr-4"
      >
        {{ $t("5Bp1HBe0zDdIJBY94bD26") }}
      </router-link>
    </div>
    <div class="flex text-[1rem]">
      <router-link
        :to="{ name: 'Invitation' }"
        active-class="active-link"
        class="custom-link flex-1 text-center"
      >
        {{ $t("Q3Sv5rpbJ8n9mIeXLeqJk") }}
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="less">
.custom-link {
  color: black;
  text-decoration: none;
  transition: color 0.3s ease;
}

.custom-link.active-link {
  color: #0cbf53;
  font-weight: bold;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 1px;
    left: 0;
    width: 100%;
    background-color: #0cbf53;
  }
}
</style>
