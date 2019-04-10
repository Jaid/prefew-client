import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {connect} from "react-redux"
import {formValueSelector} from "redux-form"
import {isEmpty} from "lodash"
import mainActions from "mainActions"

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
export default class ExportButton extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    presets: PropTypes.array,
    image: PropTypes.string,
  }

  render() {
    return <button type="button" disabled={!this.props.image || this.props.presets |> isEmpty} onClick={this.props.export}>Export</button>
  }

}