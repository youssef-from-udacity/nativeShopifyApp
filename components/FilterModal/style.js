import styled from 'styled-components';
import { View, TouchableOpacity, Text, Modal, ScrollView} from 'react-native'


export const StyledView = styled(View)`
    flex: 1;
    justify-content: flex-end;
`
export const StyledOpacity = styled(TouchableOpacity)`
    padding-left: 5px;
    padding-right: 5px;
`
export const StyledText = styled(Text)`
    flex: 1;
    padding-right: 40px;
    text-align: center;
    color: white;
    font-size: 20px;
    font-weight: bold;
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
    height: 50%;
`
export const ModalContainer = styled(View)`
    width: 100%;
    height: 40%;
`

export const ModalHeader = styled(View)`
    background-color: ${props => props.theme.background};
    border-color: ${props => props.theme.listBackground};
    border-top-width: 1px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px;
    flex-direction: row;
    align-items: center;
`
export const ModalContent= styled(View)`
    background-color: ${props => props.theme.listBackground};
    height: 100%;
`

export const StyledScrollView= styled(ScrollView)`
    padding-top: 10px;
`