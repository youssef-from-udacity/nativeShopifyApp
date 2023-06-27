import React from 'react';
import { connect } from 'react-redux'
import { getBestSellingProductById } from '../redux/shop'
import { BestSellingProductItem as Item}  from '../components/BestSellingProductItem'
//import { withNavigation } from 'react-navigation';

class BestSellingProductItem extends React.Component {
  navigateToProductDetail = () => {
    const id = this.props.product.id

     this.props.navigation.navigate('Product',{
      screen: 'ProductDetailScreen',
      params: {
        productId: id
      }
     })
  }

  render() {
    return (
        <Item product={this.props.product} onPressItem={this.navigateToProductDetail} />
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    product: getBestSellingProductById(state, ownProps.id),
  }
}

const BestSellingProductItemContainer = connect(
  mapStateToProps
)(BestSellingProductItem)

export default BestSellingProductItemContainer