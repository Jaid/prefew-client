import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ImageSelect from "components/ImageSelect"
// import PresetSelect from "components/PresetSelect"
// import PresetOptions from "components/PresetOptions"
import PresetControls from "components/PresetControls"
import {reduxForm, FieldArray} from "redux-form"

import css from "./style.scss"

@reduxForm({
  form: "controls",
  enableReinitialize: true,
})
export default class Controls extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    scheme: PropTypes.object.isRequired,
  }

  render() {
    // const presetOptionsScheme = this.props.optionsMeta.presets[this.props.selectedPreset]?.options
    // controls = <div className={css.controls}>
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.title}>Controls</div>
      <form>
        <ImageSelect className={css.imageSelect}/>
        <FieldArray name="presets" component={PresetControls}/>
      </form>
    </div>
  }

  //          <PresetSelect className={css.control}/>
  // {presetOptionsScheme ? <PresetOptions onChange={this.props.onPresetOptionsChange} initialValues={mapValues(presetOptionsScheme, properties => properties.default)} scheme={presetOptionsScheme}/> : "This preset is not configurable"}

}