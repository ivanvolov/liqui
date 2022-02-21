import { ethers } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useContractCall, useContractFunction } from "@usedapp/core"
import contractABI from "@web3/abi/SimpleContract.json"

const contractInterface = new ethers.utils.Interface(contractABI)
const contractAddress = "0xb3F8b6f4Ad8D811059587BA535AD4813Afa49Bb5"

const contract = new Contract(contractAddress, contractInterface)

export function useCount() {
    const [count]: any =
        useContractCall({
            abi: contractInterface,
            address: contractAddress,
            method: "count",
            args: []
        }) ?? []
    return count
}

export function useContractMethod(methodName: string) {
    const { state, send } = useContractFunction(contract, methodName, {})
    return { state, send }
}
