import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import ReactSelect from "react-select"
import {connect} from "react-redux"
import immer from "immer"

import css from "./style.scss"

class ImageSelect extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    if (!this.props.options) {
      return null
    }
    const selectOptions = Object.values(this.props.options).map(image => ({
      value: image.name,
      label: image.name,
    }))
    console.log(selectOptions)
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
    return <ReactSelect className={this.props.className} onChange={this.props.onChange} options={selectOptions} styles={style}/>
  }

}

const mapStateToProps = ({main}) => ({
  options: main.options?.images,
})

const mapDispatchToProps = dispatch => ({
  onChange: ({value}) => dispatch({
    type: "@@socket/send/setImage",
    payload: value,
  }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageSelect)