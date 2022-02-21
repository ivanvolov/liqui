/* eslint-disable react-hooks/rules-of-hooks */

import { pairAddress } from "@web3/index"
import { BigNumber } from "@ethersproject/bignumber"
import contractABI from "@web3/abi/Pair.json"

import { AbiItem } from "web3-utils"
import { web3Connect } from "./connector"
import { getSwapPrice } from "./getSwapPrice"
import { getAllowance } from "./getAllowance"
import { isValidTokenAmount } from "@token"

const pairContract: any = new web3Connect.eth.Contract(
    contractABI as AbiItem[],
    pairAddress
)

export const orderId = 0

//TODO: Optimize this, update only updated stuff
//TODO: Do smth with big number
export async function updateSwapInfo(
    q: any,
    token: string,
    senderAddress: any,
    pairAddress: any
) {
    console.log(">>> Router query started")
    const amount = await pairContract.methods.orders(orderId).call()

    const { amount0, amount1 } = amount

    let price
    let allowance
    if (amount && isValidTokenAmount(q)) {
        price = await getSwapPrice(amount, q, token)
        console.log("Price:", price)
        allowance = await getAllowance(token, senderAddress, pairAddress)
    }

    return {
        amount1: amount0 ? BigNumber.from(amount0) : amount0,
        amount2: amount1 ? BigNumber.from(amount1) : amount1,
        price: price ? BigNumber.from(price) : price,
        allowance: allowance ? BigNumber.from(allowance) : allowance
    }
}
