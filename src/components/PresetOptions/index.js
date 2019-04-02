import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import PresetOptionsInput from "components/PresetOptionsInput"
import {Formik, Form, Field, ErrorMessage} from "formik"
import {mapValues} from "lodash"
import {connect} from "react-redux"

import css from "./style.scss"

class PresetOptions extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    scheme: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render() {
    const generateFields = values => Object.entries(this.props.scheme).map(([fieldName, properties]) => {
      return <PresetOptionsInput value={values[fieldName]} id={fieldName} key={fieldName} properties={properties}/>
    })

    const initialValues = mapValues(this.props.scheme, value => value.default || "?")

    return <Formik onSubmit={this.props.onSave} initialValues={initialValues}>
      {formikProps => (
        <Form>
          {generateFields(formikProps.values)}
          <input type="submit"/>
        </Form>
      )}
    </Formik>
  }

}

const mapDispatchToProps = dispatch => ({
  onSave: values => dispatch({
    type: "@@socket/send/setPresetOptions",
    payload: values,
  }),
})

export default connect(null, mapDispatchToProps)(PresetOptions)