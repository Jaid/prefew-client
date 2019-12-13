import React from "react"
import ReactDom from "react-dom"
import {Provider} from "react-redux"
import {applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk"

import App from "components/App"

import reducer from "./redux/reducer"
import socketMiddleware from "./redux/socket"
import soundMiddleware from "./redux/sound"

const enhancer = applyMiddleware(thunk, socketMiddleware, soundMiddleware)
const store = createStore(reducer, enhancer)

const rootNode = document.createElement("div")
document.body.append(rootNode)

ReactDom.render(<Provider store={store}>
  <App/>
</Provider>, rootNode)