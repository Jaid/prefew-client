import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactSelect from "react-select"
import {connect} from "react-redux"
import immer from "immer"
import mainActions from "mainActions"

import css from "./style.scss"

class PresetSelect extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }

  render() {
    if (!this.props.options) {
      return null
    }
    const selectOptions = Object.keys(this.props.options).map(preset => ({
      value: preset,
      label: preset,
    }))
    const selectedOption = selectOptions.find(selectOption => selectOption.value === this.props.value)
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
    return <ReactSelect value={selectedOption} className={this.props.className} options={selectOptions} onChange={this.props.onChange} styles={style}/>
  }

}

const mapStateToProps = ({main}) => ({
  options: main.options?.presets,
  value: main.selectedPreset,
})

const mapDispatchToProps = dispatch => ({
  onChange: ({value}) => {
    dispatch(mainActions.setPreset(value))
    dispatch({
      type: "@@socket/send/setPreset",
      payload: value,
    })
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PresetSelect)