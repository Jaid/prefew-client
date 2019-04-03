import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import RcSelect, {Option} from "rc-select"
import classnames from "classnames"

import css from "./style.scss"

@connect(({main}) => ({
  images: main.options.images,
}))
export default class ImageSelect extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    images: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
  }

  render() {
    return <div className={classnames(this.props.className, css.container)}>
    Select image
      <RcSelect className={css.input} onSelect={this.props.input.onChange}>
        {Object.values(this.props.images).map(image => <Option key={image.name}>{image.name}</Option>)}
      </RcSelect>
    </div>
  }

}