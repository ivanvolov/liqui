/* eslint-disable react-hooks/rules-of-hooks */

import { templates, tokenList } from "@web3/index"
import templateContractABI from "@web3/abi/Template.json"
import tokenContractABI from "@web3/abi/TestERC20Contract.json"
import { AbiItem } from "web3-utils"
import { Token } from "@token"
import { web3Connect } from "./connector"

const templateContract: any = new web3Connect.eth.Contract(
    templateContractABI as AbiItem[],
    templates[1].address
)

export const params: any = [
    4,
    ...[Token(1, 1), Token(4000), Token(6000), Token(8000)],
    ...[Token(10000, 1), Token(20000), Token(30000), Token(40000)],
    ...[Token(10000, 1), Token(20000), Token(30000), Token(40000)],
    ...[Token(1, 1), Token(4000), Token(6000), Token(8000)]
]

export const getSwapPrice = (amount: any, q: any, token: string) => {
    const templateOrder = {
        owner: token,
        templateId: 1,
        params,
        amount0: amount.amount0,
        amount1: amount.amount1,
        isValid: true,
        deadline: 0
    }

    return new Promise((res, rej) => {
        templateContract.methods
            .getPrice(
                Token(parseFloat(q)),
                token,
                templateOrder,
                tokenList[0].address,
                tokenList[1].address
            )
            .call()
            .then((result: any) => res(result))
            .catch((err: any) => {
                console.error("getPrice", err)
                res(undefined)
            })
    })
}

export const getAllowance = async (token: any, owner: any, spender: any) => {
    const tokenContract: any = new web3Connect.eth.Contract(
        tokenContractABI as AbiItem[],
        token
    )
    return new Promise((res, rej) => {
        tokenContract.methods
            .allowance(owner, spender)
            .call()
            .then((result: any) => res(result))
            .catch((err: any) => {
                console.error("getAllowance", err)
                res(0)
            })
    })
}
