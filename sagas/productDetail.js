import { ProductDetailTypes } from '../redux/productDetail'
import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getProduct } from '../api'
import ProductDetailAction from '../redux/productDetail'


export function* fetchProductDetail(action) {
    const { id } = action 
    const response =  yield call(getProduct, id)
    const payload = yield response.json()
    if(response.ok){      
        yield put(ProductDetailAction.requestProductDetailSuccess(payload))
    }else{
        yield put(ProductDetailAction.requestProductDetailFailed())
    }
}
export const productDetailSaga = [
    takeLatest(ProductDetailTypes.REQUEST_PRODUCT_DETAIL, fetchProductDetail)
]
