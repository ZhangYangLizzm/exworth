export const PPC_PREFIX = "withdraw_ppc";
export const VCC_PREFIX = "withdraw_vcc";
export const PPC_CANCEL_PREFIX = "withdraw_cancel_ppc";
export const RECHARGE = "recharge";
export const SEND = "send";
export const INTERNAL = "withdraw_internal";
export const ADJUST_PROFIT = "adjust_profit";
export const DEPOSIT = "deposit";
export const APPLYCARDS = "applycards";
export const REPORTLOSS = "reportloss";

export const useOrderType = () => {
  const { t } = useI18n();

  const FLOW_TYPES = {
    [`${PPC_PREFIX}.${SEND}`]: t("mtzd-o04L2UDLaN81GSRl"),
    [`${INTERNAL}`]: t("pGrhTXj8A84ieJpHf6k3L"),
    [DEPOSIT]: t("p85LUkdtTlZNxvwxEVGX8"),
    [`${PPC_PREFIX}.${APPLYCARDS}`]: t("46XbjJJedfhvddlC3NTJ0"),
    [`${PPC_PREFIX}.${RECHARGE}`]: t("Y8Q4sAZg7x3OGpUJ7N-Wr"),
    [`${PPC_CANCEL_PREFIX}.${SEND}`]: t("Af035ZJECpXV2Eo5mGVlg"),
    [`${PPC_CANCEL_PREFIX}.${APPLYCARDS}`]: t("U8O12gFgVi5IgP7_ZxEoL"),
    [`${PPC_CANCEL_PREFIX}.${RECHARGE}`]: t("kOPo-JKT9YvFWURtL3glv"),
    [`${PPC_PREFIX}.${REPORTLOSS}`]: t("V5iuTIMuFVZZsXSMMx4Tx"),
    [ADJUST_PROFIT]: t("Ecm5B6_7vgNubPB9PjhG3"),
    [`${VCC_PREFIX}.${RECHARGE}`]: t("0iPU3tUxly0NQpks8YW7d"),
  };

  const FlowTypeList = computed(() => Object.entries(FLOW_TYPES));

  const FLOW_TYPE_GROUPS = [
    {
      label: t("JMrHbl_ei1CFmRIw8N60f"),
      options: [
        {
          label: t("mtzd-o04L2UDLaN81GSRl"),
          value: `${PPC_PREFIX}.${SEND}`,
        },
        {
          label: t("pGrhTXj8A84ieJpHf6k3L"),
          value: INTERNAL,
        },
        {
          label: t("p85LUkdtTlZNxvwxEVGX8"),
          value: DEPOSIT,
        },
        {
          label: t("Af035ZJECpXV2Eo5mGVlg"),
          value: `${PPC_CANCEL_PREFIX}.${SEND}`,
        },
        {
          label: t("Ecm5B6_7vgNubPB9PjhG3"),
          value: ADJUST_PROFIT,
        },
      ],
    },
    {
      label: t("OnPSpwMATKuG2io4jQP3a"),
      options: [
        {
          label: t("--6PBqH-6-OhHdzPSJvNF"),
          value: `${PPC_PREFIX}.${APPLYCARDS}`,
        },
        {
          label: t("VVQaPte21XgxJXEM9H8gu"),
          value: `${PPC_PREFIX}.${RECHARGE}`,
        },
        {
          label: t("h0EQGD5w6L9xSdGkk4eG0"),
          value: `${PPC_PREFIX}.${REPORTLOSS}`,
        },
        {
          label: t("F0CoBzfm77tn2mvw1Jm_X"),
          value: `${PPC_CANCEL_PREFIX}.${APPLYCARDS}`,
        },
        {
          label: t("8JZxT60NtcisxpMNvx57D"),
          value: `${PPC_CANCEL_PREFIX}.${RECHARGE}`,
        },
      ],
    },
    {
      label: t("S2OrYOKW-4S0okv_ixAu-"),
      options: [
        {
          label: t("VVQaPte21XgxJXEM9H8gu"),
          value: `${VCC_PREFIX}.${RECHARGE}`,
        },
      ],
    },
  ];

  const FlowTypeLable = (key) => FLOW_TYPES[key];

  return { FlowTypeList, FlowTypeLable, FLOW_TYPE_GROUPS };
};
