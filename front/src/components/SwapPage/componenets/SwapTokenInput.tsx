/* eslint-disable react-hooks/rules-of-hooks */

import { setTokenAction, setTokenValueAction } from "@state/actions"
import { useEthers } from "@usedapp/core"
import { tokenList } from "@web3"
import { connect } from "react-redux"
import { _Token } from "@token"
import { getTokenBalance } from "@hooks/router/getBalance"
import TokenButton from "@components/shared/TokenButton"
import { tokenAmountValidator } from "@components/shared/validation"

function SwapTokenInput(props: any) {
    const tokenType: any = props.tokenType
    const tokenValue = props[`${tokenType}_value`]
    const tokenId = props[tokenType]
    const { account } = useEthers()

    const selectedChanged = (i: number) => {
        if (!account) return
        props.changeToken(tokenType, i)
    }

    const handleAmountChange = (event: any) => {
        if (!account) return
        let newValue: any = tokenAmountValidator(event.target.value)
        props.changeValue(tokenType, newValue)
    }

    const setMaxAmount = async () => {
        if (!account) return
        const maxTokenValue = await getTokenBalance(
            account as string,
            tokenList[tokenId].address
        )

        props.changeValue(tokenType, _Token(maxTokenValue))
    }

    return (
        <form
            className="w-full "
            onSubmit={(e) => {
                e.preventDefault()
            }}
        >
            <div className="flex items-center border-b border-t border-gray1-g66 py-1">
                <TokenButton
                    selectedToken={tokenList[tokenId]}
                    selectedChanged={selectedChanged}
                />
                {tokenType === "token0" ? (
                    <div>
                        <button
                            className="flex-shrink-0 inline-flex text-sm font-bold font-mono text-gray1-g66 py-0.5 border px-2.5 border-gray1-g66 rounded"
                            type="button"
                            onClick={setMaxAmount}
                        >
                            MAX
                        </button>
                    </div>
                ) : null}
                <input
                    disabled={!account}
                    className="text-right appearance-none bg-transparent border-none w-full text-white text-2xl font-semibold text-white mr-3 my-1 pr-3 leading-tight focus:outline-none"
                    type="string"
                    placeholder="0.0"
                    autoComplete="off"
                    onChange={(e: any) => handleAmountChange(e)}
                    value={tokenValue}
                />
            </div>
        </form>
    )
}

const mapStateToProps = (state: any) => {
    return {
        token0: state.swap.token0,
        token1: state.swap.token1,
        token0_value: state.swap.token0_value,
        token1_value: state.swap.token1_value
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeToken: (tokenType: any, token: any) => {
            dispatch(setTokenAction(tokenType, token))
        },
        changeValue: (tokenType: any, value: any) => {
            dispatch(setTokenValueAction(tokenType, value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwapTokenInput)
