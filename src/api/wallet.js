import useRequest from '@/hooks/useRequest'
const { request } = useRequest('/api')

export const postWithdrawTransfer = data => request({
    url: 'otc/withdraw',
    method: 'POST',
    data
})

export const getBalanceHistory = params => request({
    url: 'otc/balanceHistory',
    method: 'GET',
    params
})

export const getDepositHistory = params => request({
    url: 'otc/blockchain/deposit/history',
    method: 'GET',
    params: { ...params, timeKey: "createTime" }
})

export const getWithdrawHistory = params => request({
    url: 'otc/withdraw',
    method: 'GET',
    params: { ...params, type: "ppc.send", timeKey: "createTime" }
})
export const getTransferstory = params => request({
    url: 'otc/withdraw',
    method: 'GET',
    params: { ...params, type: "internal", timeKey: "createTime" }
})
export const getOtcRate = params => request({
    url: 'otc/rate',
    method: 'GET',
    params
})

export const postCurrencyWithdraw = data => request({
    url: 'otc/withdraw',
    method: 'POST',
    data
})

/**
 * 
 * @param {amout}  金额
 * @param {authCode}  验证码
 * @param {currency}  币种
 * @param {password}  密码
 * @param {type}  转账（transfer）
 * @param {uuid}  PRO用户ID
 * @returns 
 */
export const postMemberTransfer = data => request({
    url: 'otc/withdraw',
    method: 'POST',
    data: {
        ...data,
        type: "transfer"
    }
})
