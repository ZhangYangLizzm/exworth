<script setup lang="ts">
import { checkAuthcode } from "@/api/login";
const codeValue = ref("");
const codeText = ref("");
const inputFocus = ref(false);
const loading = ref(false);

defineProps({
  step: String,
});

const codeInputChange = () => {
  if (codeValue.value && codeValue.value.length >= 6) {
    handleSubmit();
  }
};

const router = useRouter();
const handleSubmit = async () => {
  loading.value = true;
  const { statusCode } = await checkAuthcode({ authCode: codeValue.value });
  loading.value = false;
  if (statusCode === 200) {
    router.replace({ name: "User" });
  }
};

const codeInputBlur = () => {
  inputFocus.value = false;
};

const codeInputFocus = () => {
  inputFocus.value = true;
};

onMounted(() => {
  nextTick(() => {
    inputFocus.value = true;
  });
});
</script>

<template>
  <div>
    <div class="table">
      <span class="table-center">
        <div class="input-wrap">
          <h2 class="text-center">{{ $t("eUos5FB-5wR6w31SRksvr") }}</h2>
          <p class="text-center">{{ $t("KhBqW4W2I-JxGFHT6NeAt") }}</p>
        </div>
      </span>
    </div>
    <a-spin :tip="codeText" :spinning="loading">
      <div class="input-box">
        <div
          class="code-item"
          :class="codeValue.length == 0 && inputFocus ? 'code-item-active' : ''"
        >
          {{ codeValue[0] }}
        </div>
        <div
          class="code-item"
          :class="codeValue.length == 1 && inputFocus ? 'code-item-active' : ''"
        >
          {{ codeValue[1] }}
        </div>
        <div
          class="code-item"
          :class="codeValue.length == 2 && inputFocus ? 'code-item-active' : ''"
        >
          {{ codeValue[2] }}
        </div>
        <div
          class="code-item"
          :class="codeValue.length == 3 && inputFocus ? 'code-item-active' : ''"
        >
          {{ codeValue[3] }}
        </div>
        <div
          class="code-item"
          :class="codeValue.length == 4 && inputFocus ? 'code-item-active' : ''"
        >
          {{ codeValue[4] }}
        </div>
        <div
          class="code-item"
          :class="codeValue.length >= 5 && inputFocus ? 'code-item-active' : ''"
        >
          {{ codeValue[5] }}
        </div>
        <input
          class="input-code"
          ref="inputcode"
          v-model="codeValue"
          :maxlength="6"
          type="tel"
          @blur="codeInputBlur"
          @focus="codeInputFocus"
          @input="codeInputChange"
        />
      </div>
    </a-spin>
  </div>
</template>

<style lang="less" scoped>
.table {
  display: table;
  width: 100%;
  height: 100%;
  h2 {
    color: #1890ff;
  }
  .table-center {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    .input-wrap {
      margin: 0 auto;
      width: 280px;
    }
  }
}

.input-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  position: relative;
  padding: 0px 15px;
  box-sizing: border-box;

  .input-code {
    width: 100%;
    height: 50px;
    position: absolute;
    left: 0px;
    top: 0px;
    box-sizing: border-box;
    color: transparent;
    background-color: transparent;
    opacity: 0;
  }

  .code-item {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border: 1px solid#D8D8D8;
    margin-right: 10px;
    color: #444;
    font-size: 20px;
  }

  .code-item-active {
    border: 2px solid#0cbf53;
  }
}
</style>
