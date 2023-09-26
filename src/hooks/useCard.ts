export const CARD_MODE_PHYSICAL = "Physical";
export const CARD_MODE_VIRTUAL = "Virtual";

export const CARD_STATUS_BINDING = "binding";
export const CARD_STATUS_UNBIND = "unbind";
export const CARD_STATUS_NORMAL = "normal";
export const CARD_STATUS_FROZEN = "frozen";
export const CARD_STATUS_EXPIRED = "expired";
export const CARD_STATUS_LOSS = "loss";
export const CARD_STATUS_CANCELLED = "cancelled";
export const CARD_STATUS_CHANGING = "changing";
export const CARD_STATUS_UNUSABLE = "unusable";

export const CARD_STATUS_BADGE_MAP: Record<
  string,
  "default" | "error" | "success" | "processing" | "warning"
> = {
  [CARD_STATUS_BINDING]: "processing",
  [CARD_STATUS_NORMAL]: "success",
  [CARD_STATUS_FROZEN]: "default",
  [CARD_STATUS_EXPIRED]: "default",
  [CARD_STATUS_LOSS]: "error",
  [CARD_STATUS_CANCELLED]: "default",
  [CARD_STATUS_CHANGING]: "warning",
  [CARD_STATUS_UNUSABLE]: "error",
};

export const useCard = () => {
  const { t } = useI18n();

  const CARD_STATUS_TEXT: Record<string, string> = {
    [CARD_STATUS_NORMAL]: t("fDWiCOWr9VL1Lk0ky1qd9"),
    [CARD_STATUS_BINDING]: t("gEXP-JDi1zMp8_099R10z"),
    [CARD_STATUS_UNUSABLE]: t("QO_B6SeYz0bd0oPbsgx7E"),
    [CARD_STATUS_FROZEN]: t("Ao11mLILKAUZlxE87X1hR"),
    [CARD_STATUS_LOSS]: t("Hoh1GqzrHfuSYcTsbZ26D"),
    [CARD_STATUS_EXPIRED]: t("WNb2W_CLp8_wtYx_tk-Is"),
    [CARD_STATUS_CANCELLED]: t("69QS20gBy46WWnMh3nvqy"),
    [CARD_STATUS_CHANGING]: t("Ks1Uxt7tf0w9ah1IBHD0O"),
  };

  return {
    CARD_STATUS_TEXT,
  };
};
