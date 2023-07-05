import React, { useEffect } from 'react';

import { connect } from 'react-redux'
import AppNavigator from '../navigation/AppNavigator'
import StartupActions from '../redux/startup'

function Root(props) {
  useEffect(() => props.startup(), [])
  return (<AppNavigator />);
}

const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    startup: () => {
      dispatch(StartupActions.start())
    }
  }
}

const RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Root)

export default RootContainer