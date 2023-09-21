export const MEMBER_CARD = "MEMBER_CARD";
export const MEMBER_INVITE = "MEMBER_INVITE";
export const MEMBER_CARD_LOSS = "MEMBER_CARD_LOSS";
export const MEMBER_CARD_TOPUP = "MEMBER_CARD_TOPUP";
export const MEMBER_CARD_REPLACE = "MEMBER_CARD_REPLACE";
export const MEMBER_TRANSFER = "MEMBER_TRANSFER";
export const SETTING_GOOGLE_AUTH = "SETTING_GOOGLE_AUTH";
export const SETTING_RESET_PASSWORD = "SETTING_RESET_PASSWORD";
export const SETTING_RESET_CODE = "SETTING_RESET_CODE";
export const SETTING_APIKEY = "SETTING_APIKEY";
export const SETTING_LOGIN_WHITELIST = "SETTING_LOGIN_WHITELIST";
export const WALLET_TOPUP = "WALLET_TOPUP";
export const WALLET_WITHDRAW = "WALLET_WITHDRAW";
export const WALLET_TRANSFER = "WALLET_TRANSFER";
export const WALLET_FILTER = "WALLET_FILTER";

const DEFAULT_GROW = 1;

interface DrawerRrovide {
  drawerVisible: Ref<boolean>;
  drawerPattern: Ref<string>;
  updateDrawerVisible: (value: boolean) => void;
  updateFlexGrowNum: (value: number) => void;
  setDrawerPattern: (value: string) => void;
}

const rightSiderkey = Symbol() as InjectionKey<DrawerRrovide>;

const useDrawerProvide = () => {
  const drawerVisible = ref(false);
  // 控制drawer占比
  const flexGrowNum = ref(DEFAULT_GROW);

  const updateDrawerVisible = (value: boolean) => {
    drawerVisible.value = value;
  };
  const updateFlexGrowNum = (value: number) => {
    flexGrowNum.value = value;
  };

  /**
   * drawerPattern 用于控制按钮的disabled或者组件的渲染
   */
  const drawerPattern = ref("");

  const setDrawerPattern = (value: string) => {
    drawerPattern.value = value;
  };

  provide(rightSiderkey, {
    drawerVisible,
    updateDrawerVisible,
    updateFlexGrowNum,
    drawerPattern,
    setDrawerPattern,
  });

  const drawerFlexGrowClass = computed(() => {
    if (drawerVisible.value) {
      if (flexGrowNum.value === 1) {
        return "flex-grow";
      }
      return `flex-grow-[${flexGrowNum.value}]`;
    }
    return "flex-grow-0";
  });

  return { drawerVisible, drawerFlexGrowClass };
};

const useDrawerInject = () => {
  const drawerInject = inject(rightSiderkey)!;

  const {
    drawerVisible,
    updateDrawerVisible,
    updateFlexGrowNum,
    setDrawerPattern,
    drawerPattern,
  } = drawerInject;

  const openDrawer = () => {
    updateDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerPattern("");
    updateDrawerVisible(false);
  };

  /**
   *
   * @param pattern 字符串判断disabled和组件的渲染
   * @param callback click事件的回调
   */
  const wrapClick = async (pattern?: string, callback?: () => any) => {
    callback && (await callback());
    pattern && setDrawerPattern(pattern);
    openDrawer();
  };

  onScopeDispose(() => {
    closeDrawer();
    setDrawerPattern("");
    updateFlexGrowNum(DEFAULT_GROW);
  });

  return {
    drawerPattern,
    drawerVisible,
    wrapClick,
    updateFlexGrowNum,
    closeDrawer,
  };
};

const useDrawerTitle = () => {
  const { drawerPattern } = inject(rightSiderkey)!;
  const { t } = useI18n();
  const DrawerTitle: Record<string, string> = reactive({
    [SETTING_GOOGLE_AUTH]: t("1BLfOjzdVKxiPjNW8eTZR"),
    [SETTING_LOGIN_WHITELIST]: t("JTWzP44eyItAI3ZVXPe-K"),
    [SETTING_APIKEY]: t("0Uir9fGp6oKkJneCTNZWJ"),
    [SETTING_RESET_CODE]: t("y1TuxkHrhkk1OLo6_jtVB"),
    [SETTING_RESET_PASSWORD]: t("B-q5-tYEdulJDodx4ihUb"),
  });

  const Title = computed(() => DrawerTitle[drawerPattern.value]);
  return { Title };
};

export { useDrawerProvide, useDrawerInject, useDrawerTitle };
