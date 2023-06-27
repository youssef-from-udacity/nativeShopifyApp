import React from 'react';
import { connect } from 'react-redux'
import { getCollectionById, getProductCursor} from '../redux/collection'
import { HomeCategoriesItem as Item}  from '../components/HomeCategoriesItem'
//import { withNavigation } from 'react-navigation';

class HomeCategoriesItem extends React.Component {
  navigateToProductList = () => {
    const id = this.props.collection.id
     this.props.navigation.navigate('ProductList', {
      screen: 'ProductListScreen', params: {
        id: id
      }
    })
  }

  render() {
    return (
        <Item collection={this.props.collection} onPressItem={this.navigateToProductList} index={this.props.index} />
    );
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    collection: getCollectionById(state, ownProps.id),
  }
}

const HomeCategoriesItemContainer = connect(
  mapStateToProps
)(HomeCategoriesItem)

export default HomeCategoriesItemContainer