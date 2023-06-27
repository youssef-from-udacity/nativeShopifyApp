import React from 'react'
import { connect } from 'react-redux'
import  LoginComponent  from '../components/Login'
import UserActions from '../redux/user'
//import { withNavigation, StackActions, NavigationActions } from 'react-navigation';


import { getIsLogin, getIsFetching, getLoginError } from '../redux/user'
import { getName } from '../redux/shop'
import { getButtonBackgroundColor, getButtonTextColor } from '../redux/config';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';




class Login extends React.Component {
  constructor(props){
    super(props)
  }
  navigateToRegister = () => {
      this.props.navigation.navigate("RegisterScreen")
  }
  navigateToPayment = () => {
    const resetAction = CommonActions.reset({

      //actions: [
      //  this.props.navigation.navigate({ routeName: 'Main', action: this.props.navigation.navigate({routeName: 'ShoppingCart'}) }),
      //  this.props.navigation.navigate({ routeName: 'Payment'})
      //],
      routes: [
        {
          name: 'Main',
          state:{
            routes: [
              {
                name: 'ShoppingCartStack',
              },   
            ]
          }
        },
        {
          name: 'Payment'
        }
            
        
      ]
      //key: null 
    })
    this.props.navigation.dispatch(resetAction)
  }

  componentDidUpdate = (prevProps) => {
    if(this.props.isLogin === true && prevProps.isLogin === false){
      
      const isFromShoppingCart = this.props.route?.params?.ShoppingCartScreen || false;
      console.log('ShoppingCartScreen -- -- - --- -- -- -- >',isFromShoppingCart)
      if(isFromShoppingCart){
        this.navigateToPayment()
      }else{
        this.props.navigation.goBack()
      }
    }
    if(this.props.loginError === true && prevProps.loginError === false){
      Alert.alert(
        'Sorry',
        'You have submit and incorrect password or email',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      this.props.resetLoginError()
    }
  }

  render() {
    return (
        <LoginComponent 
          isFetching={this.props.isFetching} 
          buttonBackgroundColor={this.props.buttonBackgroundColor} 
          buttonTextColor={this.props.buttonTextColor}
          shopName={this.props.shopName} 
          onPressed={this.props.onPressed} 
          registerPressed={this.navigateToRegister}/>
    );
  }

}


const mapStateToProps = state => {
  return {
    isLogin: getIsLogin(state),
    shopName: getName(state),
    buttonBackgroundColor: getButtonBackgroundColor(state),
    buttonTextColor: getButtonTextColor(state),
    isFetching: getIsFetching(state),
    loginError: getLoginError(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onPressed: (email, password) => {
      dispatch(UserActions.requestLogin(email, password))
    },
    resetLoginError: () => {
      dispatch(UserActions.resetLoginError())
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer