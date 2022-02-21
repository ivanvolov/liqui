import { BigNumber } from "@ethersproject/bignumber"

export const uintSolidityMaxValue: BigNumber = BigNumber.from(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
)

const defaultNumDigits = 18

export const toToken = (value: any[], digits?: number): BigNumber[] => {
    return value.map((i) => Token(i, digits))
}

export const Token = (
    value: string | number,
    digits = defaultNumDigits
): BigNumber => {
    if (value === 0 || value === "0" || !value) return BigNumber.from(0)

    value = parseFloat(value.toString())
    let [x, y] = value.toString().split(".")

    const a: any = BigNumber.from(x + "0".repeat(digits))
    if (y) {
        y = y.slice(0, digits)
        let zeros = digits - y.length
        const b = BigNumber.from(y + (zeros > 0 ? "0".repeat(zeros) : ""))

        return a.add(b)
    } else return a
}

const numDigits = 18

export const _Token = (_value: BigNumber, roundDigits: number = 3): string => {
    if (!_value) return "0"
    const value = _value.toString()
    if (value === "0") return "0"

    if (value.length > numDigits) {
        const decimalPoint = value.length - numDigits

        const [beforeDp, afterDp] = [
            value.slice(0, decimalPoint),
            value.slice(decimalPoint)
        ]

        const afterDpRounded = Math.round(
            parseFloat(afterDp.slice(0, roundDigits + 1)) / 10
        )
        if (afterDpRounded === 0) return `${beforeDp}`

        return `${beforeDp}.${removeZerosFromBehind(afterDpRounded)}`
    } else {
        const zerosAfterDecimal = numDigits - value.length
        if (zerosAfterDecimal >= roundDigits) return "0"

        const afterDpRounded = Math.round(
            parseFloat(value.slice(0, roundDigits - zerosAfterDecimal + 1)) / 10
        )

        return `0.${"0".repeat(zerosAfterDecimal)}${removeZerosFromBehind(
            afterDpRounded
        )}`
    }
}

const removeZerosFromBehind = (value: any): string => {
    value = value.toString()
    while (value[value.length - 1] === "0") value = value.slice(0, -1)
    return value
}

export const isValidTokenAmount = (x: any) => {
    const err = isNaN(x) || !parseFloat(x)
    return !err
}
