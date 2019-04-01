import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {encode} from "base64-arraybuffer-es6"
import Preview from "components/Preview"
import ImageSelect from "components/ImageSelect"
import PresetSelect from "components/PresetSelect"

import css from "./style.scss"

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return <div><Preview/><ImageSelect/><PresetSelect/></div>
  }

}

export default connect()(App)