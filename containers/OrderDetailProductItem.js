import React from 'react';
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { getProductById } from '../redux/orderDetail'
import { withNavigation } from 'react-navigation';


class OrderDetailProductItem extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const product = this.props.product
    return (
      <View style = {{flex: 1, flexDirection: 'row'}}>
        <Text numberOfLines={1} style ={{flex: 8}}>{product.title}</Text>
        <Text style = {{flex: 2}}>x {product.quantity}</Text>
      </View>
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    product: getProductById(state, ownProps.id),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestRemoveProduct: (id) => {
      dispatch(CartActions.requestRemoveProductFromCheckout(id))
    }
  }
}

const OrderDetailProductItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailProductItem)

export default withNavigation(OrderDetailProductItemContainer)