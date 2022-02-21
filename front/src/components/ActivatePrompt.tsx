import React from "react"
import Container from "./Container"

const ActivatePrompt = () => {
    return (
        <Container>
            <div className="flex flex-col space-y-4 items-center">
                <img
                    src="/logo192.png"
                    alt="logo"
                    className="w-24 h-24 rounded-full"
                />
                <span className="text-black-700 font-bold text-lg text-center">
                    Please connect your wallet before proceeding.
                </span>
                <button
                    className="flex-1 p-2 px-4 border hover:text-black hover:bg-white bg-black text-white font-bold rounded-full w-full"
                    onClick={() => true}
                >
                    Connect with Metamask
                </button>
            </div>
        </Container>
    )
}

export default ActivatePrompt
