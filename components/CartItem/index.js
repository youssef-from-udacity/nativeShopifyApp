import React from 'react';
import { Item, Title } from './style'
import { Image, View } from 'react-native'
export const CartItem = ({ image, title, variantTitle, price, quantity, onPressItem }) => {
    return(
        <Item onPress={onPressItem} style = {{flexDirection: 'row', backgroundColor: 'white', marginTop: 5, padding: 5}}>
            <Image style = {{height: 100,width: 100}} source={{uri: image}}/>
            <View style = {{padding: 10, flex:1,}}>
                <Title numberOfLines={2} style = {{fontSize: 20}}>{title}</Title>
                <Title style = {{fontSize: 15}}>{variantTitle} x {quantity}</Title>
                <Title style = {{fontSize: 15, fontWeight: 'bold', marginTop: 10}}>{price}</Title>
            </View>
        </Item>
    )
}

