import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {encode} from "base64-arraybuffer-es6"
import arraybufferEqual from "arraybuffer-equal"
import {isEqual} from "lodash"

import css from "./style.scss"

export default class Preview extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    buffer: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired,
    presetName: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
    presetOptions: PropTypes.object,
    presetSchema: PropTypes.object.isRequired,
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
    if (isEqual(this.props.presetOptions, nextProps.presetOptions) && arraybufferEqual(this.props.buffer, nextProps.buffer)) {
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
    const imgProps = {
      className: classnames(css.image, this.props.className),
      src: `data:image/webp;base64,${this.props.buffer |> encode}`,
    }

    if (this.props.presetOptions?.clientZoom && this.props.presetOptions.clientZoom !== 1) {
      imgProps.style = {
        width: this.props.metadata.width * this.props.presetOptions.clientZoom,
        height: this.props.metadata.height * this.props.presetOptions.clientZoom,
        imageRendering: this.props.presetSchema.pixelatedZoom ? "pixelated" : "optimizeQuality",
      }
    }

    return <div ref={this.ref} className={classnames(css.container, css.animated)}>
      <img {...imgProps}/>
    </div>
  }

}