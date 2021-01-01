import React from 'react';
import { ButtonView, MainView, TextTotal, TextPrice, TextButton, AddToCartButton} from './style'

export const AddToCart = ({ addToCart, price }) => {
    return (
        <MainView>
            <TextTotal >Total </TextTotal>
            <TextPrice>{price}</TextPrice>
            <ButtonView >
              <AddToCartButton   onPress={() => addToCart({ variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8xNzE2ODgzODk1MDk3Ng==', quantity: 1 })}>
                <TextButton>Add to cart</TextButton>
              </AddToCartButton>
            </ButtonView>
          </MainView> 
    )
}

