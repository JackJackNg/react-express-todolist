import { Component } from 'react';
import PropTypes from 'prop-types'

class BaseForm extends Component {

  constructor(props) {
    super(props)
    this.onSuccess = props.onSuccess.bind(this)
  }
}

BaseForm.protoType = {
  onSuccess: PropTypes.func.isRequired
}

export default BaseForm