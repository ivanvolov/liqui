/* eslint-disable no-underscore-dangle */
import { allReducers } from "./reducers"
import { composeWithDevTools } from "redux-devtools-extension"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import logger from "redux-logger"
import { persistStore } from "redux-persist"

const composeEnhancers = composeWithDevTools({})

const store = createStore(
    allReducers,
    composeEnhancers(applyMiddleware(thunk, logger))
)

const persistor = persistStore(store)
export { persistor, store }
