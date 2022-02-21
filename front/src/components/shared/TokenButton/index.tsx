/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react"

import expand_more from "@assets/expand_more.svg"
import TokenModal from "./TokenModal"
import { connect } from "react-redux"
import { useEthers } from "@usedapp/core"

const TokenButton = (props: any) => {
    const selectedToken: any = props.selectedToken
    const [showModal, setShowModal] = useState(false)
    const { account } = useEthers()

    const selectedChanged: any = props.selectedChanged

    const showModalHandler = () => {
        if (!account) return
        setShowModal(true)
    }
    return (
        <>
            <button
                className="flex-shrink-0 inline-flex text-xl font-semibold text-white pl-2 pr-0 rounded"
                type="button"
                onClick={showModalHandler}
            >
                <img
                    className="object-cover object-center mx-3"
                    src={selectedToken.src}
                    width="30x"
                    height="30px"
                />
                {selectedToken.name}
                <img
                    className="object-cover object-center rounded"
                    src={expand_more}
                    alt={"expand_more"}
                    width="30px"
                    height="30px"
                />
            </button>
            {showModal ? (
                <TokenModal
                    setShowModal={setShowModal}
                    selectedChanged={selectedChanged}
                />
            ) : null}
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {}
}

const mapDispatchToProps = (dispatch: any) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenButton)
