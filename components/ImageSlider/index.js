import React from 'react';
import { theme } from '../../constants/Theme'
import { StyledImage, StyledSwiper, StyledView } from './style'
import Swiper from 'react-native-swiper';

const renderImage = (images) => {
    
    return (
        images.map((image, index) => {
            return (
                <StyledView key={index} >
                    <StyledImage
                            source={{uri: image}}
                            style = {{resizeMode: 'center'}}
                    />
                </StyledView>
            )
        })
    )
}

export const ImageSlider = ({ images }) => {

    return(
        <Swiper loop={false} showsButtons={images.length > 1 ? true : false}>
            {renderImage(images)}
        </Swiper>
            
    )
}

