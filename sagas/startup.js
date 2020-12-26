import { takeLatest, select, put, call } from 'redux-saga/effects';
import { StartupTypes } from '../redux/startup'
import CartActions from '../redux/cart'
import { AsyncStorage } from "react-native"
import CollectionActions from '../redux/collection'

function checkExpiry(expiryAt){
    const tokenDate = new Date(expiryAt)
    const currentDate = new Date()
    if(tokenDate < currentDate){
        return true
    }else{
        return false
    }
}

export function* start() {
    yield put(CollectionActions.requestCollectionList())
    
    const id = yield call([AsyncStorage, 'getItem'], 'cartId')
    if (id){
        yield put(CartActions.setCartId(id))
        yield put(CartActions.requestCartDetail())
    }else{
        yield put(CartActions.requestCreateCheckout())
    }
    const accessToken = yield call([AsyncStorage, 'getItem'], 'accessToken')
    if(accessToken){
        const expiryAt = yield call([AsyncStorage, 'getItem'], 'expiryAt')
        const isExpired = checkExpiry(expiryAt)

    }else{
        console.log('not login')
    }
}

export const startupSaga = [
    takeLatest(StartupTypes.START, start),
]
