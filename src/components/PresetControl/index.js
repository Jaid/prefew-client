import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import RcSelect, {Option} from "rc-select"
import {connect} from "react-redux"
import {Field} from "redux-form"
import PresetSelect from "components/PresetSelect"

import css from "./style.scss"

const mapStateToProps = ({main}) => ({
  optionsScheme: main.options.presets,
})

// @connect(mapStateToProps)(PresetControl)
class PresetControl extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    formKey: PropTypes.string.isRequired,
    optionsScheme: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    fields: PropTypes.object.isRequired,
  }

  render() {
    const value = this.props.fields.get(this.props.index)
    let presetOptions
    if (value?.name) {
      presetOptions = "A"
    }
    return <div className={classnames(css.container, this.props.className)}>
      <Field name={`${this.props.formKey}.name`} component={PresetSelect} scheme={this.props.optionsScheme}/>
      {presetOptions}
    </div>
  }

}