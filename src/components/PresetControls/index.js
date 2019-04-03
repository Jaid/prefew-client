import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import PresetControl from "components/PresetControl"

import css from "./style.scss"

export default class PresetControls extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    fields: PropTypes.object.isRequired,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <button type="button" onClick={() => this.props.fields.push({})}>Add Preset</button>
      {this.props.fields.map((key, index, fields) => <PresetControl key={key} formKey={key} index={index} fields={fields}/>)}
    </div>
  }

}