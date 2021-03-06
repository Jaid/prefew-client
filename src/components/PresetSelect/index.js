import classnames from "classnames"
import immer from "immer"
import {mapValues} from "lodash"
import PropTypes from "prop-types"
import RcSelect, {Option} from "rc-select"
import React from "react"
import shortid from "shortid"

import css from "./style.scss"

export default class extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    fields: PropTypes.object.isRequired,
    scheme: PropTypes.object.isRequired,
  }

  render() {
    const options = Object.entries(this.props.scheme).map(([name, properties]) => {
      return <Option key={name}>{properties.title}</Option>
    })

    return <RcSelect className={this.props.className}
      placeholder="Add preset"
      value=""
      onSelect={name => this.props.fields.push({
        name,
        options: mapValues(this.props.scheme[name].optionsSchema, ({defaultValue}) => defaultValue),
        previewId: shortid.generate(),
      })}>
      {options}
    </RcSelect>
  }

}