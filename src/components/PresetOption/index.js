import classnames from "classnames"
import PropTypes from "prop-types"
import NumberInput from "rc-input-number"
import React from "react"
import Switch from "react-switch"

import css from "./style.scss"

export default class extends React.Component {

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
      input = <NumberInput defaultValue={this.props.defaultValue} {...inputProps} name={this.props.input.name} onChange={value => this.props.input.onChange(value)}/>
    } else if (this.props.type === "boolean") {
      input = <Switch checked={Boolean(this.props.input.value)} onChange={value => this.props.input.onChange(value)}/>
    } else {
      input = <input defaultValue={this.props.defaultValue} type="text"/>
    }

    return <div className={classnames(css.container, this.props.className)}>
      <div className={classnames(css.optionName, css[`optionName-${this.props.type}`])}>{this.props.optionName}</div>
      <div className={classnames(css.inputContainer, css[`inputContainer-${this.props.type}`])}>{input}</div>
    </div>
  }

}