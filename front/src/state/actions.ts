export const changePairAction = () => ({
    type: "CHANGE_PAIR"
})

export const setTokenAction = (tokenType: any, token: any) => ({
    type: "SET_TOKEN",
    tokenType,
    token
})

export const setMintTokenAction = (token: any) => ({
    type: "SET_TOKEN",
    token
})

export const setTokenValueAction = (tokenType: any, value: any) => ({
    type: "SET_VALUE",
    tokenType,
    value
})

export const approveTokenAction = (tokenType: any) => ({
    type: "SET_APPROVED",
    tokenType
})

export const setSwapInfoAction = (info: any) => ({
    type: "SET_INFO",
    info
})

export const setUserBalanceAction = (balances: any) => ({
    type: "SET_BALLANCE",
    balances
})
