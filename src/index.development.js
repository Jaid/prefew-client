import React from "react"
import ReactDom from "react-dom"
import HotApp from "components/HotApp"
import {Provider} from "react-redux"

import {createStore} from "./redux/index.dev.js"

const store = createStore({})

const rootNode = document.createElement("div")
document.body.append(rootNode)

ReactDom.render(<Provider store={store}>
  <HotApp/>
</Provider>, rootNode)