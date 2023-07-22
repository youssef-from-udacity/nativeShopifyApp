import React from 'react';
import { StyledFlatList } from './style'
import CartItemContainer from '../../containers/CartItem'
import {  RefreshControl} from 'react-native';


export class CartList extends React.Component {
  constructor(props) {
    super(props)

  }
  _onRefresh = () => {
    this.props.onRefresh()
  }
  render() {
    return (
      <StyledFlatList
        data={this.props.productIds}
        renderItem={({ item }) => <CartItemContainer {...this.props} id={item} />}
        onLayout={this.handleLayout}
        keyExtractor={(item) => item}
        refreshControl={
          <RefreshControl
            refreshing={this.props.isFetching}
            onRefresh={this._onRefresh}
            size='large'
            progressViewOffset={100}
          />

        }

      />
    )
  }
}

