import React, { Component } from 'react'

export const getPetitionUserData = () => {
  if (typeof(Storage) === 'undefined') {
    return null
  }
  let userData = localStorage.getItem('l214.lib-change-org.userdata')
  if (!userData) {
    return null;
  }
  userData = JSON.parse(userData) || null
  return userData
}

const withPetitionBindings = WrappedComponent => {
  return class extends Component {
    constructor() {
      super()
      this.onPetitionSucceedBound = this.onPetitionSucceed.bind(this)
    }
    componentDidMount() {
      const userData = getPetitionUserData()
      if (userData) {
        this.props.didGetPetitionData(userData)
      }
      if (window.jQuery) {
        window.jQuery(document).on('petition:didSucceed', this.onPetitionSucceedBound)
      }
    }

    componentWillUnmount() {
      if (window.jQuery) {
        window.jQuery(document).off('petition:didSucceed', this.onPetitionSucceedBound)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }

    onPetitionSucceed(event, d) {
      this.props.didGetPetitionData(d.postData)
    }
  }
}

export default withPetitionBindings
