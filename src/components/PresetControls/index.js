import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"

import PresetControl from "components/PresetControl"
import PresetSelect from "components/PresetSelect"

import css from "./style.scss"

@connect(({main}) => ({
  optionsScheme: main.options.presets,
}))
export default class extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    fields: PropTypes.object.isRequired,
    optionsScheme: PropTypes.object.isRequired,
  }

  render() {
    const presetControls = this.props.fields.map((key, index, fields) => {
      return <PresetControl key={key} fields={fields} formKey={key} index={index} scheme={this.props.optionsScheme}/>
    })
    return <div className={classnames(css.container, this.props.className)}>
      Add preset
      <PresetSelect fields={this.props.fields} scheme={this.props.optionsScheme}/>
      {presetControls}
    </div>
  }

}