import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import Preview from "components/Preview"
import ImageSelect from "components/ImageSelect"
import PresetSelect from "components/PresetSelect"
import PresetOptions from "components/PresetOptions"
import classnames from "classnames"
import {mapValues} from "lodash"
import mainActions from "mainActions"

import css from "./style.scss"

class App extends React.Component {

  static propTypes = {
    buffer: PropTypes.string,
    optionsMeta: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    onPresetOptionsChange: PropTypes.func.isRequired,
    mode: PropTypes.string,
    selectedPreset: PropTypes.string,
    selectedImage: PropTypes.string,
  }

  render() {
    let controls = null
    if (this.props.optionsMeta && this.props.mode === "user") {
      const presetOptionsScheme = this.props.optionsMeta.presets[this.props.selectedPreset]?.options
      controls = <div className={css.controls}>
        <ImageSelect className={css.control}/>
        <PresetSelect className={css.control}/>
        {presetOptionsScheme ? <PresetOptions onChange={this.props.onPresetOptionsChange} initialValues={mapValues(presetOptionsScheme, properties => properties.default)} scheme={presetOptionsScheme}/> : "This preset is not configurable"}
      </div>
    }
    return <div className={classnames(css.container, css[`mode-${this.props.mode}`])}>
      <Preview buffer={this.props.buffer}/>
      {controls}
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
  onPresetOptionsChange: values => dispatch({
    type: "@@socket/send/setPresetOptions",
    payload: values,
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)