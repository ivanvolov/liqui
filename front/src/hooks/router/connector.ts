import Web3 from "web3"
import { infuraRopsten } from "../../config"

export const web3Connect = new Web3(
    new Web3.providers.HttpProvider(infuraRopsten)
)
