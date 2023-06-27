import React from 'react';
import { StyledFlatList } from './style'
import ProductItem  from '../../containers/ProductItem'
import { View, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';


export const ProductList = ({ productIds, endReached }) => {
    const navigation = useNavigation();
    return(
        <StyledFlatList
        data={productIds}
        renderItem={({item}) => <ProductItem id={item} navigation={navigation} /> }
        keyExtractor={(item) => item}
        numColumns= {2}
        onEndReached= {endReached}
        contentContainerStyle={{paddingBottom:60}}
        />
    )
}

