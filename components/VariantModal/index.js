import React from 'react';
import { StyledQty, HeaderView, StyledImage, StyledText, StyledModal, StyledView, ModalContainer, ModalHeader, ModalContent, StyledFlatList } from './style'

import { Entypo } from '@expo/vector-icons';

import { theme } from '../../constants/Theme'
import VariantModalItem from '../../containers/VariantModalItem'
import AddToCart from '../../containers/AddToCart'
import { View, TouchableOpacity, TouchableWithoutFeedback,Image } from 'react-native'

export default class VariantModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  _keyExtractor = (item, index) => item;


  render() {
    return (
      <StyledModal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => { }}
      >
        <StyledView>
          <TouchableWithoutFeedback onPress={this.props.cancelPressed} style={{ backgroundColor: 'black' }}>
            <View style={{ height: '100%' }}></View>
          </TouchableWithoutFeedback>
          <ModalContainer>
            <ModalHeader>
            <View style={{
              width: 100,
              height: 100,
              top: -50,
              backgroundColor: theme.listBackground,
              borderRadius: 8,
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 4,
              elevation: 4,
              }}>

              <StyledImage resizeMode='contain'  source={{ uri: this.props.selectedVariantImage }} />
            </View>
              <HeaderView>
                <View style={{ flexDirection: 'row' }}>
                  <StyledText style={{ flex: 8 }}>{this.props.title}</StyledText>
                  <TouchableOpacity onPress={this.props.cancelPressed} style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }} >
                    <Entypo
                      name='cross'
                      size={26}
                      color='grey'
                    />
                  </TouchableOpacity>
                </View>
                <StyledText>{this.props.selectedVariantPrice} / unit</StyledText>
                <View style={{
                  marginTop: 10,
                  marginBottom: 30,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <StyledQty>Quantity:            </StyledQty>
                  <TouchableOpacity onPress={this.props.onAddPressed}>
                    <Entypo name='plus' size={20} color='grey' />
                  </TouchableOpacity>
                  <StyledQty>     {this.props.selectedCount}    </StyledQty>
                  <TouchableOpacity onPress={this.props.onMinusPressed}>
                    <Entypo
                      name='minus'
                      size={20}
                      color='grey'
                    />
                  </TouchableOpacity>
                </View>

              </HeaderView>
            </ModalHeader>
            <View style={{ top: -20, height: 1, width: '100%', backgroundColor: 'grey' }}></View>
            <ModalContent>
              <StyledFlatList
                data={this.props.variants}
                keyExtractor={this._keyExtractor}
                numColumns={2}
                renderItem={({ item, index }) => {
                  return <VariantModalItem id={item} />
                }}
              />
            </ModalContent>

          </ModalContainer>
          <AddToCart />
        </StyledView>
      </StyledModal>
    )
  }
}


