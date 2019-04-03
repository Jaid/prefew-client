import immer from "immer"
import {omit} from "lodash"
import {combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"

import {socketReducer} from "./socket"

const mainReducer = (state, action) => {
  if (!state) {
    return {}
  }
  if (action.type === "@@main/newPreview") {
    return immer(state, draft => {
      draft.previews = action.payload
    })
  }
  if (action.type === "@@main/setMode") {
    return immer(state, draft => {
      draft.mode = action.payload
    })
  }
  if (action.type === "@@main/setOptions") {
    return immer(state, draft => {
      draft.options = action.payload
    })
  }
  if (action.type === "@@main/setPreset") {
    return immer(state, draft => {
      draft.selectedPreset = action.payload
    })
  }
  if (action.type === "@@main/setImage") {
    return immer(state, draft => {
      draft.selectedImage = action.payload
    })
  }
  if (action.type === "@@main/setPresetOptions") {
    return immer(state, draft => {
      draft.presetOptions = action.payload
    })
  }
  return state
}

export default combineReducers({
  main: mainReducer,
  socket: socketReducer,
  form: formReducer,
})