import { ethers } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useContractCall, useContractFunction } from "@usedapp/core"
import contractABI from "@web3/abi/Pair.json"
import { pairAddress, registryContractAddress } from "@web3/index"

const contractInterface = new ethers.utils.Interface(contractABI)

export function useBuy(pairContractAddress: string) {
    const contract = new Contract(
        pairContractAddress || pairAddress,
        contractInterface
    )
    const { state, send } = useContractFunction(contract, "swap", {})
    return { state, send }
}

export function usePlaceOrder(pairContractAddress: string) {
    const contract = new Contract(
        pairContractAddress || registryContractAddress,
        contractInterface
    )
    const { state, send } = useContractFunction(contract, "placeOrder", {})
    return { state, send }
}

export function useProvideLiquidity(pairContractAddress: string) {
    const contract = new Contract(
        pairContractAddress || registryContractAddress,
        contractInterface
    )
    const { state, send } = useContractFunction(
        contract,
        "provideLiquidity",
        {}
    )
    return { state, send }
}

export function useGetOrder(pairContractAddress: string, id: number) {
    const res: any = useContractCall({
        abi: contractInterface,
        address: pairContractAddress,
        method: "orders",
        args: [id]
    })
    return res
}
