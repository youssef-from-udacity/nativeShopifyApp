import React from 'react'
import { connect } from 'react-redux'
import { OrderList as Item } from '../components/OrderList'
import { getAllAddressIds, getIsFetching } from '../redux/user'
import CartActions from '../redux/cart'
import { getButtonBackgroundColor, getButtonTextColor } from '../redux/config'
import { withNavigation } from 'react-navigation'

class OrderList extends React.Component {

  addNewAddressPressed = () => {
    this.props.navigation.navigate("AddNewAddressScreen")
  }
  render(){
    return(
      <Item 
        addNewAddressPressed={this.addNewAddressPressed} 
        addressIds={this.props.addressIds} 
        isFetching={this.props.isFetching} 
        buttonTextColor={this.props.buttonTextColor}
        buttonBackgroundColor={this.props.buttonBackgroundColor}/>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    addressIds: getAllAddressIds(state),
    isFetching: getIsFetching(state),
    buttonBackgroundColor: getButtonBackgroundColor(state),
    buttonTextColor: getButtonTextColor(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onRefresh:() => { dispatch(CartActions.requestCartDetail())}
  }
}
const OrderListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderList)

export default withNavigation(OrderListContainer)