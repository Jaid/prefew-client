import socketIoClient from "socket.io-client"
import immer from "immer"
import {pick} from "lodash"
import mainActions from "mainActions"
import {parse} from "query-string"

const port = 40666
const sendPrefix = "@@socket/send/"
// const receivePrefix = "@@socket/received/"
const connectEvent = "@@socket/connected"
const socketClient = socketIoClient(`localhost:${port}`)

const mapDispatchToSocket = dispatch => ({
  hey: payload => dispatch(mainActions.setOptions(pick(payload, "images", "presets"))),
  newPreview: payload => {
    dispatch(mainActions.newPreview(payload))
  },
})

export const socketReducer = (state, action) => {
  if (!state) {
    return {
      status: "unset",
    }
  }
  if (!action?.type.startsWith("@@socket/")) {
    return state
  }
  const actionType = action.type.substring("@@socket/".length)
  if (actionType === "connected") {
    return immer(state, draft => {
      draft.status = "connected"
    })
  }
  return state
}

export default store => {
  socketClient.on("connect", () => {
    const mode = parse(document.location.search)?.mode || "user"
    store.dispatch({
      type: connectEvent,
    })
    store.dispatch({
      type: "@@main/setMode",
      payload: mode,
    })
    store.dispatch({
      type: "@@socket/send/setMode",
      payload: mode,
    })
    for (const [eventName, eventHandler] of mapDispatchToSocket(store.dispatch) |> Object.entries) {
      socketClient.on(eventName, eventHandler)
    }
  })
  return next => action => {
    if (action.type.startsWith(sendPrefix)) {
      const eventName = action.type.substring(sendPrefix.length)
      socketClient.emit(eventName, action.payload)
    }
    return next(action)
  }
}