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
import css from "./style.scss"

class App extends React.Component {

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

const mapStateToProps = state => ({
  buffer: state.main.preview?.buffer,
  mode: state.main.mode,
  optionsMeta: state.main.options,
  selectedPreset: state.main.selectedPreset,
  selectedImage: state.main.selectedImage,
})

const mapDispatchToProps = dispatch => ({
  onControlsChange: values => dispatch({
    type: "@@socket/send/setOptions",
    payload: values,
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)