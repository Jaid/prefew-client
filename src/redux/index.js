import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {createHashHistory} from "history"

import reducer from "./reducer"

const history = createHashHistory()
const enhancer = applyMiddleware(thunk)

const createAdvancedStore = initialState => createStore(reducer, initialState, enhancer)

export {
  history,
  createAdvancedStore as createStore
}