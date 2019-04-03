import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {connect} from "react-redux"
import immer from "immer"
import RcSelect, {Option} from "rc-select"

import css from "./style.scss"

@connect(({main}) => ({
  options: main.options?.images,
}), dispatch => ({
  onChange: ({value}) => dispatch({
    type: "@@socket/send/setImage",
    payload: value,
  }),
}))
export default class ImageSelect extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    return <RcSelect className={this.props.className} onSelect={this.props.onChange}>
      {Object.values(this.props.options).map(image => <Option key={image.name}>{image.name}</Option>)}
    </RcSelect>
  }

}