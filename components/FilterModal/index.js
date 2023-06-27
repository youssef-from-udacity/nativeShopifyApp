import React from 'react';
import { StyledText, StyledModal, StyledView, ModalContainer, ModalHeader, StyledOpacity, ModalContent, StyledScrollView, FilterText, FilterTouchableContainer} from './style'
//import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

import { TouchableWithoutFeedback, View } from 'react-native'

export default class FilterModal extends React.Component {
    constructor(props){
        super(props)
    }

    renderCheck = () => {
        return (
            <Feather
                name='check'
                size={26}
                color={this.props.primaryColor}
                style = {{flex: 1, textAlign: 'right', paddingRight: 10,}}
            />
        )
    }

    onPress = (sort) => {
        this.props.onPress(sort)
    }

    renderSort = (sorts) => {
        return sorts.map(sort => {
            return (
                <FilterTouchableContainer key ={sort.value} onPress={() => this.onPress(sort)}>
                    <FilterText>{sort.title}</FilterText>
                    { sort.checked && this.renderCheck() }
                </FilterTouchableContainer>
                
            )
        })
    }

    render (){
        return(
        <StyledModal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => {
           
          }}>
            <StyledView>
                    <TouchableWithoutFeedback onPress={this.props.cancelPressed}style = {{ backgroundColor: 'black'}}>
                        <View style = {{height: '100%'}}></View>
                    </TouchableWithoutFeedback>
                    <ModalContainer>
                        <ModalHeader style = {{backgroundColor: this.props.primaryColor}}>
                            <StyledOpacity onPress= {this.props.cancelPressed}>
                                <Entypo
                                    name='cross'
                                    size={26}
                                    color='white'
                                />
                            </StyledOpacity>
                            <StyledText>Sort By</StyledText>
                        </ModalHeader>
                        <ModalContent>
                            <StyledScrollView contentContainerStyle={{paddingBottom:80}}>
                                {this.renderSort(this.props.sorts)} 
                            </StyledScrollView>
                        </ModalContent>
                    </ModalContainer>
            </StyledView>
        </StyledModal>
        )
    }
}


