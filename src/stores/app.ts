export const Mobile = "Mobile";
export const Monitor = "Monitor";

const useAppStore = defineStore("app", () => {
  const device = ref("Monitor");

  // 在 store 中定義一個方法
  function setDevice() {
    const width = window.innerWidth;

    if (width < 768) {
      device.value = "Mobile";
    } else if (width >= 768 && width <= 1024) {
      device.value = "Tablet";
    } else if (width >= 1024 && width <= 1440) {
      device.value = "Laptop";
    } else {
      device.value = "Monitor";
    }
  }

  // 初始化時執行一次
  setDevice();

  // 註冊 resize 事件
  window.addEventListener("resize", setDevice);

  // 記得在銷毀時移除事件
  onUnmounted(() => {
    window.removeEventListener("resize", setDevice);
  });

  const isMobile = computed(() => device.value === Mobile);

  const isMonitor = computed(() => device.value === Monitor);

  return { isMobile, isMonitor };
});

export { useAppStore };
