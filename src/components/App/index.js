import "rc-select/assets/index.css"
import "./rc-select.scss"
import "rc-input-number/assets/index.css"
import "./rc-input-number.scss"

import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"

import Controls from "components/Controls"
import Preview from "components/Preview"

import query from "src/query"

import css from "./style.scss"


class App extends React.Component {

  static propTypes = {
    previewData: PropTypes.array,
    optionsMeta: PropTypes.object,
    onControlsChange: PropTypes.func.isRequired,
    mode: PropTypes.string,
    selectedPreset: PropTypes.string,
    selectedImage: PropTypes.string,
    connectionStatus: PropTypes.string.isRequired,
  }

  static defaultProps = {
    previewData: [],
  }

  render() {
    if (this.props.connectionStatus !== "connected") {
      return this.props.mode === "mirror" ? null : "Not connected."
    }
    if (!this.props.optionsMeta && this.props.mode === "user") {
      return this.props.mode === "mirror" ? null : "Waiting for options."
    }
    const previews = this.props.previewData.map(preview => <Preview key={preview.previewId} mode={this.props.mode} presetSchema={this.props.optionsMeta.presets[preview.presetName]} {...preview}/>)
    const previewsContainerStyle = {}
    if (query.previewsWidth) {
      previewsContainerStyle.maxWidth = `${query.previewsWidth}px`
    }
    return <div className={classnames(css.container, css[`mode-${this.props.mode}`])}>
      {this.props.mode === "user" && <Controls className={css.controls} scheme={this.props.optionsMeta} onChange={this.props.onControlsChange}/>}
      <div className={classnames(css.previews, Boolean(query.previewsRight) && css.previewsRight)} style={previewsContainerStyle}>{previews}</div>
    </div>
  }

}

export default connect(({main, socket}) => ({
  previewData: main.previews,
  mode: main.mode,
  optionsMeta: main.options,
  selectedPreset: main.selectedPreset,
  selectedImage: main.selectedImage,
  connectionStatus: socket.status,
}), dispatch => ({
  onControlsChange: values => dispatch({
    type: "@@socket/send/setOptions",
    payload: values,
  }),
}))(App)