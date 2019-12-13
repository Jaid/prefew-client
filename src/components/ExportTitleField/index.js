import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {connect} from "react-redux"
import {Field} from "redux-form"

import css from "./style.scss"

@connect(({form}) => ({
  imageName: form.controls?.values?.image,
}))
export default class extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    imageName: PropTypes.string,
  }

  render() {
    return <Field component="input" name="exportTitle" placeholder={this.props.imageName} type="text"/>
  }

}