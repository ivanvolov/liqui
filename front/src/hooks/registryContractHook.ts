import { ethers } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useContractCall, useContractFunction } from "@usedapp/core"
import contractABI from "@web3/abi/Registry.json"
import { registryContractAddress } from "@web3/index"

const contractInterface = new ethers.utils.Interface(contractABI)
const contractAddress = registryContractAddress

const contract = new Contract(contractAddress, contractInterface)

export function useCreatePair() {
    const { state, send } = useContractFunction(contract, "createPair", {})
    return { state, send }
}

export function useGetPair(token0: string, token1: string) {
    const [res]: any =
        useContractCall({
            abi: contractInterface,
            address: contractAddress,
            method: "getPair",
            args: [token0, token1]
        }) ?? []
    return res
}
