import {isEmpty} from "lodash"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"
import {formValueSelector} from "redux-form"

import css from "./style.scss"

const selector = formValueSelector("controls")

@connect(state => ({
  presets: selector(state, "presets"),
  image: selector(state, "image"),
}), dispatch => ({
  export: () => dispatch({
    type: "@@socket/send/export",
  }),
}))
export default class extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    presets: PropTypes.array,
    image: PropTypes.string,
    export: PropTypes.func.isRequired,
  }

  render() {
    return <button disabled={!this.props.image || this.props.presets |> isEmpty} type="button" onClick={this.props.export}>Export</button>
  }

}