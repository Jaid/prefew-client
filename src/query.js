import {parse} from "query-string"

const defaults = {
  mode: "user",
}

const parsed = parse(document.location.search)

export default Object.assign(defaults, parsed)