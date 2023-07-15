import React from 'react';
import { theme } from '../../constants/Theme'
import { StyledImage, StyledView } from './style'
import { Text, Image } from 'react-native'
import Swiper from 'react-native-swiper';
const renderImage = (images) => {

  return (
    images.map((image, index) => {
      return (
        <Image
          key={index}
          style={{
            resizeMode: 'contain',
            height: 500,
            width: 'auto'
          }}
          source={{ uri: image }}
        />
      )
    })
  )
}

export const ImageSlider = ({ images, primaryColor }) => {
  return (
    <Swiper
      activeDotColor={primaryColor}
      style={{
        backgroundColor: 'white', height: '100%'
      }}
      loop={false}
      showsButtons={images.length > 1 ? true : false}
      nextButton={<Text style={{
        fontSize: 50,
        color: primaryColor
      }}>›</Text>}
      prevButton={<Text style={{
        fontSize: 50,
        color: primaryColor
      }}>‹</Text>}
    >
      {renderImage(images)}
    </Swiper>

  )
}

