<script setup lang="ts">
import androidCode from "@/assets/google-authenticator-android.png";
import authcodeLogo from "@/assets/google-authenticator-logo.png";
import iOSCode from "@/assets/google-authenticator-iOS.png";

const map: Record<string, string> = reactive({
  iOS: "https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8",
  android:
    "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=zh",
});

function download(type: string) {
  window.open(map[type], "_blank");
}
</script>
<template>
  <div class="l-authcode">
    <div class="l-authcode-header text-center">
      <img :src="authcodeLogo" alt="" />
    </div>
    <div class="l-authcode-body">
      <h3>{{ $t("xa_5p2VfwZP6iLAnodQCn") }}</h3>
      <span class="desc">{{ $t("xR7QapkoYs4NdELmVc2W_") }}</span>
      <a-row>
        <a-col :span="12" class="text-center">
          <h4>iOS</h4>
          <a @click="download('iOS')">
            {{ $t("E4rGcV_uNwQcHn6KcTfPO") }}
          </a>
          <div>
            <img :src="iOSCode" alt="" />
          </div>
        </a-col>

        <a-col :span="12" class="text-center">
          <h4>Android</h4>
          <a @click="download('android')">
            {{ $t("E4rGcV_uNwQcHn6KcTfPO") }}
          </a>
          <div>
            <img :src="androidCode" alt="" />
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<style lang="less" scoped>
.l-authcode {
  .l-authcode-header {
    background: #37bf53;
    text-align: center;
    padding: 20px;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .l-authcode-body {
    .text-center {
      img {
        width: 120px;
        height: 120px;
        vertical-align: middle;
      }
    }
    .desc {
      font-size: 13px;
      color: #888;
    }
    h4 {
      margin: 20px 0 0;
    }
  }
}
</style>
