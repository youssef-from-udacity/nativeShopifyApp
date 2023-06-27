import React from 'react';
import { connect } from 'react-redux'
import { getCollectionById, getProductCursor } from '../redux/collection'
import { CollectionItem as Item } from '../components/CollectionItem'
import { useNavigation } from '@react-navigation/native';

//import { withNavigation } from 'react-navigation';

class CollectionItem extends React.Component {
  constructor(props){
    super(props)
  }
  
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

const CollectionItemContainer = connect(
  mapStateToProps
)(CollectionItem)

export default CollectionItemContainer