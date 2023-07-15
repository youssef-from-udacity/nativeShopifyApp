import styled from 'styled-components';
import { View, TouchableOpacity, Text, Modal, FlatList, Image, Animated} from 'react-native'


export const StyledImage = styled(Image)`
    height: 100%;
    width: 100%;
`
export const HeaderView = styled(View)`
    flex: 1;
    padding-left: 10px;
    
`
export const StyledView = styled(Animated.View)`
    flex: 1;
    justify-content: flex-end;
`
export const StyledOpacity = styled(TouchableOpacity)`
    padding-left: 5px;
    padding-right: 5px;
`
export const StyledText = styled(Text)`
    font-size: 15px;
`
export const StyledQty = styled(Text)`
    font-size: 15px;
`

export const FilterText = styled(Text)`
    font-size: 18px;
`   
export const FilterTouchableContainer = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    padding: 10px;
`  

export const SortContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const StyledModal = styled(Modal)`
    height: 100%;
    background-color: ${props => props.theme.listBackground};
`
export const ModalContainer = styled(View)`
    width: 100%;
    height: 60%;
    border-radius: 5px;
`

export const ModalHeader = styled(View)`
    background-color: ${props => props.theme.listBackground};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 5px;
    flex-direction: row;
`
export const ModalContent= styled(View)`
    background-color: ${props => props.theme.listBackground};
    height: 100%;
    top: -20px;
`

export const StyledFlatList = styled(FlatList)`
    padding-top: 10px;
`
