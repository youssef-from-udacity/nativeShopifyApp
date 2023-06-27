import React from 'react';
import { SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { PaymentComponent } from '../components/Payment'
import { getWebUrl } from '../redux/cart'
import { getAccessToken, getIsLogin } from '../redux/user'
import CartActions from '../redux/cart'
//import { StackActions, NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';


class Payment extends React.Component {
  static navigationOptions = {
    headerTitle: 'Checkout'
  };

  paymentCompleted = () => {
    if(this.props.isLogin){
      this.props.paymentSuccess()
      this.props.navigation.goBack()   
    }else{
      this.props.paymentSuccess()
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
        ]
        //key: null 
      })
      this.props.navigation.dispatch(resetAction)
    }
    
  }

  goToLogin = () => {
    this.props.navigation.navigate('Login',{screen:'LoginScreen'})
  }

  render() {
    return (
        <SafeAreaView style = {{flex:1}}>
            <PaymentComponent goToLogin={this.goToLogin} userAccessToken={this.props.userAccessToken} url={this.props.url} paymentCompleted={this.paymentCompleted}/>
        </SafeAreaView>
    );
  }

}

const mapStateToProps = state => {
  return {
      url: getWebUrl(state),
      userAccessToken: getAccessToken(state),
      isLogin: getIsLogin(state),
  }
}
const mapDispatchToProps = dispatch => {
  return {
    paymentSuccess: () => {
      dispatch(CartActions.paymentSuccess())
    }
  }
}

const PaymentScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment)

export default PaymentScreen