import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"

import reducer from "./reducer"

const createAdvancedStore = initialState => {
  const logger = createLogger({
    level: "info",
    collapsed: true,
  })
  const enhancers = []
  const middleware = [
    thunk,
    logger,
  ]
  let composeEnhancers
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  } else {
    composeEnhancers = compose
  }
  enhancers.push(applyMiddleware(...middleware))
  const enhancer = composeEnhancers(...enhancers)
  const store = createStore(reducer, initialState, enhancer)
  if (module.hot) {
    module.hot.accept("./reducer", () => store.replaceReducer(require("./reducer").default))
  }
  return store
}

export {
  createAdvancedStore as createStore
}