import {combineReducers} from "redux"
import {connectRouter} from "connected-react-router"

import main from "./mainReducer"

export default history => combineReducers({
  router: connectRouter(history),
  main,
})