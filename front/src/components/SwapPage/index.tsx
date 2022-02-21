/* eslint-disable react-hooks/rules-of-hooks */
import { tokenList, pairAddress } from "@web3"
import { connect } from "react-redux"
import { setSwapInfoAction, setUserBalanceAction } from "@state/actions"
import { useEffect, useState } from "react"
import { updateSwapInfo } from "@hooks"
import { useEthers } from "@usedapp/core"

import SwapWindow from "./SwapWindow"
import { TransactionAlertContainer } from "@components/popups/TransactionAlertContainer"
import { getAllTokenBalances } from "@hooks/router/getBalance"

const SwapPage = (props: any) => {
    const [loading, setLoading] = useState(false)
    const [snapshot, setSnapshot]: any = useState({})

    const { account } = useEthers()

    const tokenToSellValue = props.token0_value

    useEffect(() => {
        const interval = setInterval(async () => {
            const orderInfo: any = {
                q: tokenToSellValue,
                token: tokenList[props.token0].address,
                senderAddress: account,
                pairAddress
            }
            const isSmthChanged = (orderInfo: any) => {
                if (
                    snapshot.q === orderInfo.q &&
                    snapshot.token === orderInfo.token &&
                    snapshot.senderAddress === orderInfo.senderAddress &&
                    snapshot.tokenToSell === orderInfo.tokenToSell
                )
                    return false
                setSnapshot(orderInfo)
                return true
            }
            const is = isSmthChanged(orderInfo)
            console.log(is)
            if (is) {
                setLoading(true)
                const info = await updateSwapInfo(
                    tokenToSellValue,
                    tokenList[props.token0].address,
                    account,
                    pairAddress
                )
                setLoading(false)
                props.setSwapInfo(info)
            }
        }, 200)
        return () => clearInterval(interval)
    }, [props, tokenToSellValue, account, snapshot])

    const { setUserBalances } = props
    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (account) {
                const accountTokenList = await getAllTokenBalances(
                    account as string
                )
                setUserBalances(accountTokenList)
            }
        }, 100)
        return () => clearTimeout(timeout)
    }, [account, setUserBalances])

    useEffect(() => {
        const interval = setInterval(async () => {
            if (account) {
                const accountTokenList = await getAllTokenBalances(
                    account as string
                )
                setUserBalances(accountTokenList)
            }
        }, 4000)
        return () => clearInterval(interval)
    }, [account, setUserBalances])

    return (
        <>
            <TransactionAlertContainer />
            <SwapWindow loading={loading} setLoading={setLoading} />
        </>
    )
}
const mapStateToProps = (state: any) => {
    return {
        token0: state.swap.token0,
        token0_value: state.swap.token0_value
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setSwapInfo: (amount: any) => {
            dispatch(setSwapInfoAction(amount))
        },
        setUserBalances: (balances: any) => {
            dispatch(setUserBalanceAction(balances))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapPage)
