import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import Preview from "components/Preview"
import Controls from "components/Controls"
import classnames from "classnames"
import {mapValues} from "lodash"
import mainActions from "mainActions"

import "rc-select/assets/index.css"
import "./rc-select.scss"

import "rc-input-number/assets/index.css"
import "./rc-input-number.scss"

import css from "./style.scss"

@connect(({main}) => ({
  buffer: main.preview?.buffer,
  mode: main.mode,
  optionsMeta: main.options,
  selectedPreset: main.selectedPreset,
  selectedImage: main.selectedImage,
}), dispatch => ({
  onControlsChange: values => dispatch({
    type: "@@socket/send/setOptions",
    payload: values,
  }),
}))
export default class App extends React.Component {

  static propTypes = {
    buffer: PropTypes.string,
    optionsMeta: PropTypes.object,
    onControlsChange: PropTypes.func.isRequired,
    mode: PropTypes.string,
    selectedPreset: PropTypes.string,
    selectedImage: PropTypes.string,
  }

  render() {
    return <div className={classnames(css.container, css[`mode-${this.props.mode}`])}>
      <Preview buffer={this.props.buffer}/>
      {this.props.optionsMeta && this.props.mode === "user" && <Controls onChange={this.props.onControlsChange} className={css.controls} scheme={this.props.optionsMeta}/>}
    </div>
  }

}