import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {Field} from "formik"

import css from "./style.scss"

export default class PresetOptionsInput extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    value: PropTypes.any,
  }

  render() {
    const {type, name} = this.props.properties
    const fieldProps = {
      type,
      className: css.field,
      name: this.props.id,
      value: this.props.value,
    }
    if (this.props.properties.min) {
      fieldProps.min = this.props.properties.min
    }
    if (this.props.properties.max) {
      fieldProps.max = this.props.properties.max
    }
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.title}>{this.props.id}</div>
      <Field {...fieldProps}/>
    </div>
    // if (this.props.info) {
    //   info = this.props.info
    //   if (this.props.type === "text") {
    //     info = `(Text) ${info}`
    //   }
    //   if (this.props.type === "number") {
    //     info = `(Zahl) ${info}`
    //   }
    //   if (this.props.default && this.props.value !== this.props.default) {
    //     info = `${info} (Standard-Einstellung: ${this.props.default})`
    //   }
    // }
    // return <div className={classnames(css.container, this.props.className)}>
    //   <div className={css.title} title={this.props.id}>{this.props.title}</div>
    //   {info && <div className={css.info}>{info}</div>}
    //   <Field className={css.field} type={this.props.type} name={this.props.id} value={this.props.value}/>
    // </div>
  }

}