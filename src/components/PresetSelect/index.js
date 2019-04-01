import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactSelect from "react-select"
import {connect} from "react-redux"
import immer from "immer"

import css from "./style.scss"

class PresetSelect extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    if (!this.props.options) {
      return null
    }
    const selectOptions = this.props.options.map(preset => ({
      value: preset,
      label: preset,
    }))
    const style = {
      container: baseStyle => ({
        ...baseStyle,
        width: "300px",
      }),
      control: baseStyle => ({
        ...baseStyle,
        background: "transparent",
      }),
      option: (baseStyle, state) => ({
        ...baseStyle,
        color: state.isFocused ? "#47A3FF" : "lightgray",
      }),
      menu: baseStyle => ({
        ...baseStyle,
        background: "#000000EE",
      }),
      singleValue: baseStyle => ({
        ...baseStyle,
        color: "lightgray",
      }),
    }
    return <ReactSelect options={selectOptions} styles={style} />
  }

}

const mapStateToProps = state => ({
  options: state.options?.presets,
})

export default connect(mapStateToProps)(PresetSelect)