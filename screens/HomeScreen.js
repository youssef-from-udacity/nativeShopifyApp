import React from 'react';

import { connect } from 'react-redux'
import UserActions from '../redux/user'
import { HomeComponent } from '../components/Home'
import { getText } from '../redux/user'
import CartActions from '../redux/cart'
class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  handleAlert = () => {
  //this.props.navigation.navigate('ProductDetailScreen')
  this.props.onClick()
  }

  render() {
    return (
      <HomeComponent handleAlert = {this.handleAlert} text = {this.props.text}/>
    );
  }

}

const mapStateToProps = state => {
  return {
    text: getText(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(CartActions.requestAddProductToCheckout({
        variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzE2ODgzODk1MDk3Ng==',
        quantity: 1
      }))
    }
  }
}

const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeScreen