import { CartTypes } from '../redux/cart'
import { UserProfileTypes, getDefaultAddressId, getAddressById, getIsLogin } from '../redux/user'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { createCheckout, addProductToCheckout, getCheckout, addAddresstoCheckout, addEmailToCheckout, removeProductFromCheckout } from '../api'
import { getId, getShippingAddress } from '../redux/cart'
import CartActions from '../redux/cart'
import { AsyncStorage } from "react-native"
import { getSelectedVariant, getSelectedCount } from '../redux/productDetail';


export function* fetchCartDetail() {
    const cartId = yield select(getId)
    try{
        const response =  yield call(getCheckout, cartId)
        const payload = yield response.json()
        if(response.ok){     
            if(payload.data.node.order === null ){
                yield put(CartActions.requestCartDetailSuccess(payload)) 
            }else{
                yield put(CartActions.requestCreateCheckout()) 
            }
        }else{
            yield put(CartActions.requestCartDetailFail())
        }
    }catch(e){
        yield put(CartActions.requestCartDetailFail())
        console.log(e)
    }
}

export function* requestCreateCheckout() {
    
    const response =  yield call(createCheckout)
    const payload = yield response.json()
    if(response.ok){     
        yield put.resolve(CartActions.requestCreateCheckoutSuccess(payload))
        const cartId = yield select(getId)
        yield call([AsyncStorage, 'setItem'], 'cartId', cartId)    
    }else{
        yield put(CartActions.requestCreateCheckoutFail(payload))
    }
}

export function* requestAddProductToCheckout() {
    const variantId = yield select(getSelectedVariant)
    const variantCount = yield select(getSelectedCount)
    const cartId = yield select(getId) 
    const response = yield call(addProductToCheckout, variantId, variantCount, cartId)
    const payload = yield response.json()
    if(response.ok){
        yield put(CartActions.requestAddProductToCheckoutSuccess(payload)) 
        yield put(CartActions.requestCartDetail())
    }else{
        yield put(CartActions.requestAddProductToCheckoutFail())
    }
}

export function* requestRemoveProductFromCheckout(action) {
    const lineItemId = action.id
    const cartId = yield select(getId) 
    const response = yield call(removeProductFromCheckout, lineItemId, cartId)
    const payload = yield response.json()
    console.log('safasdfsad', payload)
    if(response.ok){
        yield put(CartActions.requestRemoveProductFromCheckoutSuccess(payload)) 
        yield put(CartActions.requestCartDetail())
    }else{
        yield put(CartActions.requestRemoveProductFromCheckoutFail())
    }
}

export function* requestAddEmailAddress(action) {
    const {email, address} = action
    const cartId = yield select(getId) 
    try{
        const addressResponse = yield call(addAddresstoCheckout, address, cartId)
        const emailResponse = yield call(addEmailToCheckout, email, cartId)
        const addressPayload = yield addressResponse.json()
        const emailPayload = yield emailResponse.json()
        if(addressResponse.ok && emailResponse.ok){
            yield put(CartActions.requestAddEmailAddressSuccess()) 
        }else{
            yield put(CartActions.requestCreateCheckoutFail())
        }
    }catch(e){
        console.log(e)
    }
}
export function* setAddressToCheckout(action) {
    const cartId = yield select(getId) 
    const defaultAddressId = yield select(getDefaultAddressId)
    const isLogin = yield select(getIsLogin)
    const cartAddress = yield select(getShippingAddress)

    if(isLogin && cartId && defaultAddressId && !cartAddress){
        const address = yield select(getAddressById, defaultAddressId)
        try{
            const response = yield call(addAddresstoCheckout, address, cartId)
            const payload = yield response.json()
            if(response.ok){
                yield put(CartActions.setAddressToCheckoutSuccess()) 
            }else{
                yield put(CartActions.setAddressToCheckoutFail())
            }
        }catch(e){
            console.log(e)
        }
    }

}


export function* clearCart() {
        yield put(CartActions.clearCart()) 
        yield put(CartActions.requestCreateCheckout())
}

export const cartSaga = [
    takeLatest(CartTypes.REQUEST_CART_DETAIL, fetchCartDetail),
    takeLatest(CartTypes.REQUEST_ADD_PRODUCT_TO_CHECKOUT_SUCCESS, fetchCartDetail),
    takeLatest(CartTypes.REQUEST_CREATE_CHECKOUT, requestCreateCheckout),
    takeLatest(CartTypes.REQUEST_ADD_PRODUCT_TO_CHECKOUT, requestAddProductToCheckout),
    takeLatest(CartTypes.REQUEST_REMOVE_PRODUCT_FROM_CHECKOUT, requestRemoveProductFromCheckout),
    takeLatest(CartTypes.REQUEST_ADD_EMAIL_ADDRESS, requestAddEmailAddress),
    takeLatest(CartTypes.REQUEST_ADD_EMAIL_ADDRESS, requestAddEmailAddress),
    takeLatest(UserProfileTypes.REQUEST_USER_ADDRESS_SUCCESS, setAddressToCheckout),
    takeLatest(CartTypes.REQUEST_CREATE_CHECKOUT_SUCCESS, setAddressToCheckout),
    takeLatest(UserProfileTypes.REQUEST_LOGIN_SUCCESS, setAddressToCheckout),
    takeLatest(CartTypes.REQUEST_CART_DETAIL_SUCCESS, setAddressToCheckout),
    takeLatest(UserProfileTypes.LOGOUT, clearCart),
]
