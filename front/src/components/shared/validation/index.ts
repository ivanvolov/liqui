export const tokenAmountValidator = (value: string) => {
    // console.log(value)

    // Only numbers
    let newValue = value.toString().replace(/[^0-9.]/gi, "")

    // Only one dot
    let output = newValue.split(".")
    if (output.length > 2) {
        newValue = output.shift() + "." + output.join("")
    }

    return newValue
}
