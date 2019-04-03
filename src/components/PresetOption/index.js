import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import NumberInput from "rc-input-number"

import css from "./style.scss"

export default class PresetOption extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    preset: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    defaultValue: PropTypes.any.isRequired,
    optionName: PropTypes.string.isRequired,
    optionProperties: PropTypes.object,
  }

  render() {
    let input

    if (this.props.type === "number") {
      const inputProps = {
        min: 0,
        max: 10,
        step: 1,
        precision: 0,
        ...this.props.optionProperties,
      }
      input = <NumberInput defaultValue={this.props.defaultValue} {...inputProps} name={this.props.input.name} onChange={this.props.input.onChange}/>
    } else {
      input = <input defaultValue={this.props.defaultValue} type="text"/>
    }

    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.optionName}>{this.props.optionName}</div>
      <div className={css.inputContainer}>{input}</div>
    </div>
  }

}