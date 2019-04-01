import React from "react"
import ReactDom from "react-dom"
import App from "components/App"
import {Provider} from "react-redux"

import {createStore} from "./redux"

const store = createStore({})

const rootNode = document.createElement("div")
document.body.append(rootNode)

ReactDom.render(<Provider store={store}>
  <App/>
</Provider>, rootNode)