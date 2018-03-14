import { Component } from 'react';
import PropTypes from 'prop-types'

class BaseForm extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = props.onSubmit.bind(this)
  }
}

BaseForm.protoType = {
  onSubmit: PropTypes.func.isRequired
}

export default BaseForm