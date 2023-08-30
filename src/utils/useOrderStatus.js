export const ORDER_STATUS_APPLYING = 0
export const ORDER_STATUS_PROCESSING = 1
export const ORDER_STATUS_SUCCESS = 2
export const ORDER_STATUS_FAILED = 3
export const ORDER_STATUS_REVOKED = 4
export const ORDER_STATUS_UNCONFIRMED = 5

export const useOrderStatus = () => {
    const { t } = useI18n();

    const STATUS_TEXTS = {
        [ORDER_STATUS_APPLYING]: t('0kbRU9sC5sUbQNf6OekMk'),
        [ORDER_STATUS_PROCESSING]: t('uh5V5mWXhqcS1mqd2KxNm'),
        [ORDER_STATUS_SUCCESS]: t('MEszo4sHm_yNnwjR6xENN'),
        [ORDER_STATUS_FAILED]: t('bi5D7HShNqipSYycY_iSX'),
        [ORDER_STATUS_REVOKED]: t('RbjdN0lNU_k-p4WYU7CH8'),
        [ORDER_STATUS_UNCONFIRMED]: t('mAjX90pEXRkWHJ1DhB9sV'),
    }

    const getOrderStatusLabel = (statusKey) => STATUS_TEXTS[statusKey];

    const getOrderStatusList = () => Object.entries(STATUS_TEXTS)

    const orderStatusList = computed(() => getOrderStatusList());

    return {
        orderStatusList,
        getOrderStatusLabel,
    };
}
