import React from "react"
import "./App.css"

import { store } from "@state/store"
import { Provider } from "react-redux"

import Header from "@components/Header"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import SwapPage from "@components/swapPage"
import MintPage from "@components/mintPage"
import OrderPage from "@components/orderPage/"
import "react-toastify/dist/ReactToastify.css"

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Background>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/swap" />
                        </Route>
                        <Route path="/swap">
                            <SwapPage />
                        </Route>
                        <Route path="/mint">
                            <MintPage />
                        </Route>
                        <Route path="/order">
                            <OrderPage />
                        </Route>
                    </Switch>
                </Background>
            </Router>
        </Provider>
    )
}

export default App

const Background = (BuildContext: any) => {
    return (
        <div className="absolute w-screen h-screen bg-black1">
            {BuildContext.children}
        </div>
    )
}
