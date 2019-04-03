import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import {connect} from "react-redux"
import immer from "immer"
import RcSelect, {Option} from "rc-select"


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
    const selectOptions = (image => ({
      value: image.name,
      label: image.name,
    }))
    return <RcSelect className={this.props.className} onSelect={this.props.onChange}>
      {Object.values(this.props.options).map(image => <Option key={image.name}>{image.name}</Option>)}
    </RcSelect>
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