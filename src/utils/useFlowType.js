export const PPC_PREFIX = "withdraw_ppc"
export const PPC_CANCEL_PREFIX = "withdraw_cancel_ppc"
export const RECHARGE = "recharge"
export const SEND = "send"
export const INTERNAL = "withdraw_internal"
export const ADJUST_PROFIT = "adjust_profit"
export const DEPOSIT = "deposit"
export const APPLYCARDS = "applycards"
export const REPORTLOSS = "reportloss"

export const useFlowType = () => {
    const { t } = useI18n()

    const FLOW_TYPES = {
        [`${PPC_PREFIX}.${SEND}`]: t('mtzd-o04L2UDLaN81GSRl'),
        [`${INTERNAL}`]: t('pGrhTXj8A84ieJpHf6k3L'),
        [DEPOSIT]: t('p85LUkdtTlZNxvwxEVGX8'),
        [`${PPC_PREFIX}.${APPLYCARDS}`]: t('46XbjJJedfhvddlC3NTJ0'),
        [`${PPC_PREFIX}.${RECHARGE}`]: t('Y8Q4sAZg7x3OGpUJ7N-Wr'),
        [`${PPC_CANCEL_PREFIX}.${SEND}`]: t('Af035ZJECpXV2Eo5mGVlg'),
        [`${PPC_CANCEL_PREFIX}.${APPLYCARDS}`]: t('U8O12gFgVi5IgP7_ZxEoL'),
        [`${PPC_CANCEL_PREFIX}.${RECHARGE}`]: t('kOPo-JKT9YvFWURtL3glv'),
        [`${PPC_PREFIX}.${REPORTLOSS}`]: t('V5iuTIMuFVZZsXSMMx4Tx'),
        [ADJUST_PROFIT]: t('Ecm5B6_7vgNubPB9PjhG3'),
    }

    const FLOW_TYPE_GROUPS = [
        {
            label: "钱包",
            options: [
                {
                    label: t('mtzd-o04L2UDLaN81GSRl'),
                    value: `${PPC_PREFIX}.${SEND}`
                },
                {
                    label: t('pGrhTXj8A84ieJpHf6k3L'),
                    value: `${INTERNAL}`
                },
                {
                    label: t('p85LUkdtTlZNxvwxEVGX8'),
                    value: DEPOSIT
                },
                {
                    label: t('Af035ZJECpXV2Eo5mGVlg'),
                    value: `${PPC_CANCEL_PREFIX}.${SEND}`
                },
                {
                    label: t('Ecm5B6_7vgNubPB9PjhG3'),
                    value: ADJUST_PROFIT
                }
            ]
        },
        {
            label: "实体卡",
            options: [
                {
                    label: t('46XbjJJedfhvddlC3NTJ0'),
                    value: `${PPC_PREFIX}.${APPLYCARDS}`
                },
                {
                    label: t('Y8Q4sAZg7x3OGpUJ7N-Wr'),
                    value: `${PPC_PREFIX}.${RECHARGE}`
                },
                {
                    label: t('U8O12gFgVi5IgP7_ZxEoL'),
                    value: `${PPC_CANCEL_PREFIX}.${APPLYCARDS}`
                },
                {
                    label: t('kOPo-JKT9YvFWURtL3glv'),
                    value: `${PPC_CANCEL_PREFIX}.${RECHARGE}`
                },
                {
                    label: t('V5iuTIMuFVZZsXSMMx4Tx'),
                    value: `${PPC_PREFIX}.${REPORTLOSS}`
                }
            ]
        }
    ]

    const getFLowTypeList = () => Object.entries(FLOW_TYPES)

    const flowTypeList = computed(() => getFLowTypeList())

    const getFlowTypeLable = (key) => FLOW_TYPES[key]

    return { flowTypeList, getFlowTypeLable }
}

