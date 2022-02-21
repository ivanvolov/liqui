import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"

import "./index.css"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import ReactModal from "react-modal"
import { ChainId, DAppProvider } from "@usedapp/core"
import { infuraRopsten } from "./config"

ReactModal.setAppElement("#root")

const config = {
    readOnlyChainId: ChainId.Ropsten,
    readOnlyUrls: {
        [ChainId.Ropsten]: infuraRopsten
    }
}

ReactDOM.render(
    <React.StrictMode>
        <DAppProvider config={config}>
            <App />
        </DAppProvider>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
