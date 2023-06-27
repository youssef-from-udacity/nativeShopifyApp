import React from 'react';
import  LoginContainer from '../containers/Login'
import { SafeAreaView } from 'react-native'


export default class LoginScreen extends React.Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    title: 'Login',
    
  };

  render() {
    return (
      <SafeAreaView>
        <LoginContainer {...this.props} />
      </SafeAreaView>
    );
  }
}
