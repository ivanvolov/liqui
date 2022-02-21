/* eslint-disable react-hooks/rules-of-hooks */
import expand_more_a from "@assets/expand_more_a.svg"
import direction from "@assets/direction.svg"
import { tokenList, pairAddress } from "@web3"
import { connect } from "react-redux"
import {
    approveTokenAction,
    changePairAction,
    setSwapInfoAction
} from "@state/actions"
import { useEffect, useState } from "react"
import { useBuy } from "@hooks/pairContractHook"
import {
    getTransactionAlertMessage,
    TransactionAlertStatus
} from "@components/popups/TransactionAlertContainer"
import { tokenContractsList, updateSwapInfo, orderId } from "@hooks"
import { toast } from "react-toastify"
import { useEthers } from "@usedapp/core"
import SwapTokenInput from "./componenets/SwapTokenInput"
import { getSwapButtonLogic } from "./componenets/SwapButtonLogic"
import { Token, _Token } from "@token"

function SwapWindow(props: any) {
    const [label, setLabel] = useState(true)
    const [notifications, setNotificationsStateValues] = useState([])
    const [isAllowToThrowError, setAllowToThrowError] = useState(false)
    const loading = props.loading

    const { account } = useEthers()
    const setLoading = props.setLoading

    const tokenToSellValue = props.token0_value

    const { account: accountAddress } = useEthers()

    const useContractMethodsApprove = tokenContractsList.map((i: any) =>
        i.useApprove()
    )

    const { state: buyState, send: buy } = useBuy(pairAddress)

    // Notifications
    // ---------------------------------------

    // ----- Buy -----

    useEffect(() => {
        const status = buyState?.status
        const txHash = buyState?.transaction?.hash
        const _notif: any = notifications.find((n: any) => n.txHash === txHash)

        if (status === "Mining") {
            if (!_notif) {
                const alertId = toast.loading(
                    getTransactionAlertMessage(
                        TransactionAlertStatus.Started,
                        "buy"
                    )
                )
                const newNot: any = [...notifications, { alertId, txHash }]
                setNotificationsStateValues(newNot)
            }
        } else if (status === "Success") {
            // console.log(_notif, notifications);
            if (notifications && _notif) {
                toast.dismiss(_notif.alertId)
                toast.success(
                    getTransactionAlertMessage(
                        TransactionAlertStatus.Succeeded,
                        "buy"
                    )
                )
                setNotificationsStateValues(
                    notifications.filter((i: any) => txHash !== i.txHash)
                )
            }
        }
    }, [buyState, notifications])

    useEffect(() => {
        if (!isAllowToThrowError) return
        const status = buyState?.status

        if (status === "Exception") {
            toast.error(
                getTransactionAlertMessage(TransactionAlertStatus.Failed, "buy")
            )
            setAllowToThrowError(false)
        }
    }, [buyState, isAllowToThrowError])

    // ----- Approve -----

    useEffect(() => {
        const status = useContractMethodsApprove[props.token0]?.state?.status
        const txHash =
            useContractMethodsApprove[props.token0]?.state?.transaction?.hash
        const _notif: any = notifications.find((n: any) => n.txHash === txHash)

        if (status === "Mining") {
            if (!_notif) {
                const alertId = toast.loading(
                    getTransactionAlertMessage(
                        TransactionAlertStatus.Started,
                        "approve"
                    )
                )
                const newNot: any = [...notifications, { alertId, txHash }]
                setNotificationsStateValues(newNot)
            }
        } else if (status === "Success") {
            // console.log(_notif, notifications);
            if (notifications && _notif) {
                toast.dismiss(_notif.alertId)
                toast.success(
                    getTransactionAlertMessage(
                        TransactionAlertStatus.Succeeded,
                        "approve"
                    )
                )
                setNotificationsStateValues(
                    notifications.filter((i: any) => txHash !== i.txHash)
                )
                setTimeout(async () => {
                    setLoading(true)
                    const info = await updateSwapInfo(
                        tokenToSellValue,
                        tokenList[props.token0].address,
                        accountAddress,
                        pairAddress
                    )
                    setLoading(false)
                    if (info) props.setSwapInfo(info)
                }, 1000)
            }
        }
    }, [
        setLoading,
        useContractMethodsApprove,
        props,
        notifications,
        tokenToSellValue,
        accountAddress
    ])

    useEffect(() => {
        if (!isAllowToThrowError) return
        const status = useContractMethodsApprove[props.token1]?.state?.status

        if (status === "Exception") {
            toast.error(
                getTransactionAlertMessage(
                    TransactionAlertStatus.Failed,
                    "approve"
                )
            )
            setAllowToThrowError(false)
        }
    }, [useContractMethodsApprove, props, isAllowToThrowError])

    // ---------------------------------------

    const handleSwap = () => {
        if (!account) return
        props.swapTokens()
        setLabel(!label)
    }

    const handleTransaction = async () => {
        if (!account) return
        buy(
            orderId,
            Token(tokenToSellValue),
            tokenList[props.token0].address,
            Token(0)
        ).then(() => {
            setAllowToThrowError(true)
        })
    }

    const handleTransactionApprove = async () => {
        if (!account) return
        useContractMethodsApprove[props.token0].send(pairAddress).then(() => {
            setAllowToThrowError(true)
        })
    }

    // console.log("Balance:", props.balances[props.token0], props.balances)
    const tokenToSellBalance = props.balances[props.token0].balance || Token(0)

    const { buttonText, handleClick } = getSwapButtonLogic({
        loading,
        tokenToSellValue,
        info: props.info,
        token0_name: tokenList[props.token0].name,
        tokenToSellBalance,
        token0_value: props.token0_value,
        handleTransactionApprove,
        account,
        handleTransaction
    })

    return (
        <div className="body-font font-sans text-md font-semibold text-gray1 text-center ">
            <div className="container mx-auto flex px-5 pt-20 items-center justify-center flex-col">
                <div className="lg:w-2/5 w-full">
                    {/*Swap Header */}
                    <div className="flex items-center flex-wrap pb-2 pl-3 mt-auto w-full">
                        <span className="inline-flex items-center">
                            Swap from:
                        </span>
                        <span className="mr-3 inline-flex items-center ml-auto leading-none pr-3 py-1 ">
                            Balance: {_Token(tokenToSellBalance)}
                        </span>
                    </div>
                    <SwapTokenInput tokenType="token0" />
                    {/*Direction Button*/}
                    <button onClick={() => handleSwap()}>
                        <img
                            className="object-cover items-center object-center rounded justify-center mt-2 mb-1 flex mx-auto"
                            src={direction}
                            alt={"direction"}
                            width="20px"
                            height="20px"
                        />
                    </button>
                    <SwapTokenInput tokenType="token1" />
                </div>
                {/*AdvSettingsButton*/}
                <button
                    className="items-end ml-auto inline-flex text-md lg:w-2/5 mr-5 font-semibold text-gray1-g66 pt-2"
                    type="button"
                >
                    Advanced settings
                    <img
                        className="object-cover object-center"
                        src={expand_more_a}
                        alt={"expand_more_a"}
                        width="20px"
                        height="20px"
                    />
                </button>
                {/*SwapButton */}
                <div className="container mx-auto flex py-32 items-center justify-center flex-col">
                    <div className="text-center w-2/5">
                        <div className="flex justify-center text-center">
                            <button
                                className="bg-transparent w-full border-gray1-g66 border text-orange1 font-sans font-medium text-xl pt-2 pb-3 rounded-lg"
                                onClick={() => handleClick()}
                            >
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        token0: state.swap.token0,
        token1: state.swap.token1,
        token0_value: state.swap.token0_value,
        token1_value: state.swap.token1_value,
        balances: state.swap.balances,
        info: state.swap.info
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        swapTokens: () => {
            dispatch(changePairAction())
        },
        approveToken: (tokenId: number) => {
            dispatch(approveTokenAction(tokenId))
        },
        setSwapInfo: (amount: any) => {
            dispatch(setSwapInfoAction(amount))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapWindow)
