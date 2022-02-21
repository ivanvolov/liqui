import { combineReducers } from "redux"
import { mintReducer } from "./minReducer"
import { swapReducer } from "./swapReducer"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { sharedReducer } from "./sharedReducer"

const swapConfig = {
    key: "swap",
    storage: storage,
    whitelist: ["token0", "token1"],
    blacklist: ["token0_value", "token1_value", "info", "balances"]
}

const sharedConfig = {
    key: "shared",
    storage: storage,
    whitelist: [],
    blacklist: []
}

const mintConfig = {
    key: "mint",
    storage: storage,
    whitelist: ["token"]
}

export const allReducers = combineReducers({
    swap: persistReducer(swapConfig, swapReducer),
    shared: persistReducer(sharedConfig, sharedReducer),
    mint: persistReducer(mintConfig, mintReducer)
})
