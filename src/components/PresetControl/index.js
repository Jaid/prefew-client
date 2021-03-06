import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Field} from "redux-form"

import PresetOption from "components/PresetOption"

import css from "./style.scss"

export default class extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    formKey: PropTypes.string.isRequired,
    scheme: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    fields: PropTypes.object.isRequired,
  }

  render() {
    const value = this.props.fields.get(this.props.index)
    const presetName = value.name
    const preset = this.props.scheme[presetName]
    let optionFields

    if (preset.optionsSchema) {
      optionFields = Object.entries(preset.optionsSchema).map(([name, properties]) => {
        const inputName = `${this.props.formKey}.options.${name}`
        const {type, defaultValue, ...optionProperties} = properties
        return <Field key={inputName} component={PresetOption} defaultValue={defaultValue} name={inputName} optionName={name} optionProperties={optionProperties} preset={preset} type={type}/>
      })
    }

    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.presetName}>
        {preset.title || value.name}
        <button className={css.removeButton} type="button" onClick={() => this.props.fields.remove(this.props.index)}>✕</button>
      </div>
      {optionFields}
    </div>
  }

}