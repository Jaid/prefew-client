import React from "react"
import PropTypes from "prop-types"
import classnames from "classnames"
import PresetOptionsInput from "components/PresetOptionsInput"
import {mapValues} from "lodash"
import {connect} from "react-redux"
import {reduxForm} from "redux-form"

import css from "./style.scss"

class PresetOptions extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    scheme: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    selectedPreset: PropTypes.string.isRequired,
  }

  render() {
    // const generateFields = values => Object.entries(this.props.scheme).map(([fieldName, properties]) => {
    //   return <PresetOptionsInput value={values[fieldName]} id={fieldName} key={`${this.props.selectedPreset}-${fieldName}`} properties={properties}/>
    // })

    // const initialValues = mapValues(this.props.scheme, value => value.default || "?")

    // return <Formik onSubmit={this.props.onSave} initialValues={initialValues}>
    //   {formikProps => (
    //     <Form>
    //       {generateFields(formikProps.values)}
    //       <input type="submit"/>
    //     </Form>
    //   )}
    // </Formik>

    const fields = Object.entries(this.props.scheme).map(([name, properties]) => <PresetOptionsInput name={name} properties={properties} key={name}/>)

    return <form>{fields}</form>
  }

}

// const mapStateToProps = ({main}) => ({
//   selectedPreset: main.selectedPreset,
// })

// const mapDispatchToProps = dispatch => ({
//   onSave: values => dispatch({
//     type: "@@socket/send/setPresetOptions",
//     payload: values,
//   }),
// })

// export default connect(mapStateToProps, mapDispatchToProps)(PresetOptions)

export default reduxForm({
  form: "presetOptions",
  enableReinitialize: true,
})(PresetOptions)