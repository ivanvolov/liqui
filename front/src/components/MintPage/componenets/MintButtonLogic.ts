export const getMintButtonLogic = (state: any) => {
    const { amountToMint, tokenName, account, handleTransaction } = state

    let buttonText = ""
    let handleClick = () => {}
    if (!account) {
        buttonText = "Connect to a wallet"
    } else if (amountToMint) {
        buttonText = `Mint ${amountToMint} of ${tokenName}`
        handleClick = handleTransaction
    } else if (!amountToMint) {
        buttonText = `Enter an amount`
    }
    return {
        buttonText,
        handleClick
    }
}
