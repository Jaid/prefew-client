import immer from "immer"
import {omit} from "lodash"

export default (state, action) => {
  if (!state) {
    return {}
  }
  if (action.type === "newPreview") {
    return immer(state, draft => {
      draft.preview = omit(action, "type")
    })
  }
  if (action.type === "setOptions") {
    return immer(state, draft => {
      draft.options = omit(action, "type")
    })
  }
  return state
}