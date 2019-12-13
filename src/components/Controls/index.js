import classnames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import {Field, FieldArray, reduxForm} from "redux-form"

import ExportButton from "components/ExportButton"
import ExportTitleField from "components/ExportTitleField"
import ImageSelect from "components/ImageSelect"
// import PresetSelect from "components/PresetSelect"
// import PresetOptions from "components/PresetOptions"
import PresetControls from "components/PresetControls"

import css from "./style.scss"

@reduxForm({
  form: "controls",
  enableReinitialize: true,
})
export default class extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    return <div className={classnames(css.container, this.props.className)}>
      <div className={css.title}>Controls</div>
      <form>
        <Field className={css.imageSelect} component={ImageSelect} name="image"/>
        <FieldArray component={PresetControls} name="presets"/>
        <ExportTitleField/>
        <ExportButton/>
      </form>
    </div>
  }

}