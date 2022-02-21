/* eslint-disable react-hooks/rules-of-hooks */

import tokenContractABI from "@web3/abi/TestERC20Contract.json"
import { AbiItem } from "web3-utils"
import { web3Connect } from "./connector"

export const getAllowance = async (token: any, owner: any, spender: any) => {
    const tokenContract: any = new web3Connect.eth.Contract(
        tokenContractABI as AbiItem[],
        token
    )
    return new Promise((res, _) => {
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
