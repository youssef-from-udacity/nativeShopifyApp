import React from 'react';
import { StyledFlatList } from './style'
import CollectionItemContainer  from '../../containers/CollectionItem'
import { Separator } from '../Styled'
import { useNavigation } from '@react-navigation/native';

export const CollectionList = ({ collectionIds, ...props }) => {
  const navigation = useNavigation();

    return(
        <StyledFlatList
        data={collectionIds}
        renderItem={({item, index}) => <CollectionItemContainer id={item} index={index} navigation={navigation} /> }
        keyExtractor={(item) => item}
        numColumns= {2}
        />
    )
}

