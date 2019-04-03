import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import immer from "immer"
import RcSelect, {Option} from "rc-select"

import css from "./style.scss"

export default class PresetSelect extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    scheme: PropTypes.object.isRequired,
  }

  render() {
    const {value, onChange} = this.props.input

    const options = Object.entries(this.props.scheme).map(([name, properties]) => {
      return <Option key={name}>{properties.name}</Option>
    })

    return <RcSelect value={value} className={this.props.className} onSelect={onChange}>
      {options}
    </RcSelect>
  }

}