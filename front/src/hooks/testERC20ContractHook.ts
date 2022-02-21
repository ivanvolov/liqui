/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useContractCall, useContractFunction } from "@usedapp/core"
import contractABI from "@web3/abi/TestERC20Contract.json"
import { tokenList } from "@web3/index"
import { BigNumber } from "@ethersproject/bignumber"

const contractInterface = new ethers.utils.Interface(contractABI)

export const tokenContractsList = tokenList.map((i) => ({
    ...i,
    useContractMethod: function (methodName: string) {
        const contract = new Contract(i.address, contractInterface)
        const { state, send } = useContractFunction(contract, methodName, {})
        return { state, send }
    },
    useApprove: function () {
        const contract = new Contract(i.address, contractInterface)
        const { state, send } = useContractFunction(contract, "approve", {})
        return {
            state,
            send: (a: any) => send(a, maxApproval)
        }
    }
}))

export function useBlockchainParams() {
    const [timestamp]: any =
        useContractCall({
            abi: contractInterface,
            address: tokenList[0].address,
            method: "getBlockchainParams",
            args: []
        }) ?? []
    return timestamp ? timestamp.toNumber() : null
}

// 2 ** 256 - 1
export const maxApproval: BigNumber = BigNumber.from(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
)
