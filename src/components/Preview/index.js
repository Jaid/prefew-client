import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"

import css from "./style.scss"

export default class Preview extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    buffer: PropTypes.string,
  }

  render() {
    if (!this.props.buffer) {
      return null
    }
    return <img className={classnames(css.image, this.props.className)} src={`data:image/webp;base64,${this.props.buffer}`}/>
  }

}