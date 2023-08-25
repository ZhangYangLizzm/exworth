// 動帳明細
const PPC_PREFIX = "withdraw_ppc"
const PPC_CANCEL_PREFIX = "withdraw_cancel_ppc"
const RECHARGE = "recharge"
const SEND = "send"
const INTERNAL = "withdraw_internal"
const ADJUST_PROFIT = "adjust_profit"
const DEPOSIT = "deposit"
const APPLYCARDS = "applycards"
const REPORTLOSS = "reportloss"
// 提現明細
export const useAccountDetails = () => {
    const { t } = useI18n()

    const defineType = () => ({
        [`${PPC_PREFIX}.${SEND}`]: t('mtzd-o04L2UDLaN81GSRl'),
        [`${INTERNAL}`]: t('pGrhTXj8A84ieJpHf6k3L'),
        [DEPOSIT]: t('p85LUkdtTlZNxvwxEVGX8'),
        [`${PPC_PREFIX}.${APPLYCARDS}`]: t('46XbjJJedfhvddlC3NTJ0'),
        [`${PPC_PREFIX}.${RECHARGE}`]: t('10QBrQYST8DUjmNhn5e4_'),
        [`${PPC_CANCEL_PREFIX}.${SEND}`]: t('Af035ZJECpXV2Eo5mGVlg'),
        [`${PPC_CANCEL_PREFIX}.${APPLYCARDS}`]: t('U8O12gFgVi5IgP7_ZxEoL'),
        [`${PPC_CANCEL_PREFIX}.${RECHARGE}`]: t('kOPo-JKT9YvFWURtL3glv'),
        [`${PPC_PREFIX}.${REPORTLOSS}`]: t('V5iuTIMuFVZZsXSMMx4Tx'),
        [ADJUST_PROFIT]: t('Ecm5B6_7vgNubPB9PjhG3'),
    })

    const getList = () => {
        const type = defineType()
        return Object.entries(type)
    }
    const getText = (key) => defineType()[key]
    return { getList, getText }
}

const ORDER_STATUSES = {
    APPLYING: 0,
    PROCESSING: 1,
    SUCCESS: 2,
    FAILED: 3,
    REVOKED: 4,
    UNCONFIRMED: 5,
};

export const useOrderStatus = () => {
    const { t } = useI18n();
    const STATUS_TEXTS = {
        [ORDER_STATUSES.APPLYING]: 'Applying',
        [ORDER_STATUSES.PROCESSING]: 'Processing',
        [ORDER_STATUSES.SUCCESS]: 'Success',
        [ORDER_STATUSES.FAILED]: 'Failed',
        [ORDER_STATUSES.REVOKED]: 'Revoked',
        [ORDER_STATUSES.UNCONFIRMED]: 'Unconfirmed',
    }
    const getOrderStatusLabel = (statusKey) => {
        return t(STATUS_TEXTS[statusKey]);
    };

    const getOrderStatusList = () => {
        return Object.entries(STATUS_TEXTS).map(([key, value]) => {
            return {
                key,
                value: t(value)
            }
        })
    }

    return {
        getOrderStatusLabel,
        getOrderStatusList
    };
}
