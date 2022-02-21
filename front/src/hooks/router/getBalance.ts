/* eslint-disable react-hooks/rules-of-hooks */

import tokenContractABI from "@web3/abi/TestERC20Contract.json"
import { AbiItem } from "web3-utils"
import { tokenList } from "@web3"
import { web3Connect } from "./connector"
import { BigNumber } from "@ethersproject/bignumber"

export const getAllTokenBalances = async (account: string) => {
    if (!account) return []
    const accountTokenList: any = [...tokenList]
    for (const i of accountTokenList) {
        const balance = await getTokenBalance(account, i.address)
        i.balance = BigNumber.from(balance)
    }
    return accountTokenList
}
export const getTokenBalance = (
    account: string,
    tokenAddress: string
): Promise<any> => {
    const tokenContract: any = new web3Connect.eth.Contract(
        tokenContractABI as AbiItem[],
        tokenAddress
    )
    return new Promise((res, _) => {
        tokenContract.methods
            .balanceOf(account)
            .call()
            .then((result: any) => res(result))
            .catch((err: any) => {
                console.error("getBalance", err)
                res(0)
            })
    })
}
