import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {encode} from "base64-arraybuffer-es6"
import arraybufferEqual from "arraybuffer-equal"

import css from "./style.scss"

export default class Preview extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    buffer: PropTypes.object.isRequired,
    presetName: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    if (this.props.mode !== "user") {
      this.ref.current.addEventListener("animationend", () => {
        this.ref.current.classList.remove(css.animated)
      })
    }
  }

  shouldComponentUpdate(nextProps) {
    if (arraybufferEqual(this.props.buffer, nextProps.buffer)) {
      return false
    }
    return true
  }

  componentDidUpdate() {
    if (this.props.mode !== "user") {
      this.ref.current.classList.add(css.animated)
    }
  }

  render() {
    return <div ref={this.ref}>
      <img className={classnames(css.image, css[`preset-${this.props.presetName}`], this.props.className)} src={`data:image/webp;base64,${this.props.buffer |> encode}`}/>
    </div>
  }

}