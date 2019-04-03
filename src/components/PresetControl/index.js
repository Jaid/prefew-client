import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import RcSelect, {Option} from "rc-select"
import {Field} from "redux-form"
import PresetSelect from "components/PresetSelect"
import PresetOption from "components/PresetOption"

import css from "./style.scss"

export default class PresetControl extends React.Component {

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
    if (preset.options) {
      optionFields = Object.entries(preset.options).map(([name, properties]) => {
        const inputName = `${this.props.formKey}.options.${name}`
        const {type, defaultValue, ...optionProperties} = properties
        return <Field name={inputName} key={inputName} preset={preset} component={PresetOption} type={type} defaultValue={defaultValue} optionProperties={optionProperties} optionName={name}/>
      })
    }

    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.presetName}>
        {value.name}
        <button className={css.removeButton} type="button" onClick={() => this.props.fields.remove(this.props.index)}>✕</button>
      </div>
      {optionFields}
    </div>
  }

}