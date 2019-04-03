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
  previewData: main.previews,
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
    previewData: PropTypes.array,
    optionsMeta: PropTypes.object,
    onControlsChange: PropTypes.func.isRequired,
    mode: PropTypes.string,
    selectedPreset: PropTypes.string,
    selectedImage: PropTypes.string,
  }

  static defaultProps = {
    previewData: [],
  }

  render() {
    const previews = this.props.previewData.map(preview => <Preview {...preview}/>)
    return <div className={classnames(css.container, css[`mode-${this.props.mode}`])}>
      <div className={css.previews}>{previews}</div>
      {this.props.optionsMeta && this.props.mode === "user" && <Controls onChange={this.props.onControlsChange} className={css.controls} scheme={this.props.optionsMeta}/>}
    </div>
  }

}