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

    t('Success')
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
