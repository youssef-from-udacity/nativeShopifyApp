import { useEffect } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native'
import ProductDetail from '../containers/ProductDetail'
import ProductImage from '../containers/ProductImage'
import AddToCart from '../containers/AddToCart'
import ProductDetailAction, { getTitle, getIsFetching } from '../redux/productDetail'
import { connect } from 'react-redux'
import { theme } from '../constants/Theme'
import ProductDetailPlaceholder from '../components/Placeholder/ProductDetailPlaceholder';

function ProductDetailScreen (props){

  useEffect(()=>{
    const productId = props.route.params.productId;
    if (productId) {
      props.requestProductDetail(productId)
    } else {
      const handle = props.route.params.handle;
      props.requestProductDetailByHandle(handle)
    }
    return ()=>props.clearProductDetail();
  },[])

  _renderProductDetail = (isFetching) => {
    if (isFetching){
      return(
        <ProductDetailPlaceholder/>
      )
    }else{
      return (
          <View style = {{backgroundColor: theme.listBackground}}>
            <View style = {{height: 500}}>
              <ProductImage/>
            </View>

              <ProductDetail navigation={props.navigation} />

          </View>
        
      )
    }
  }
  return (
    <SafeAreaView style = {{flex:1}}>
        <ScrollView style = {{ backgroundColor: theme.listBackground}}>
          <View style = {{paddingBottom:  90}}>
          {_renderProductDetail(props.isFetching)}
          </View>
        </ScrollView>
        <AddToCart  />
      </SafeAreaView>
  );
}
const mapStateToProps = state => {
  return {
    title: getTitle(state),
    isFetching: getIsFetching(state),
  }
}


const mapDispatchToProps = dispatch => {
  return {
    requestProductDetail: (id) => {
      dispatch(ProductDetailAction.requestProductDetail(id))
    },
    requestProductDetailByHandle: (handle) => {
      dispatch(ProductDetailAction.requestProductDetailByHandle(handle))
    },
    clearProductDetail: () => {
      dispatch(ProductDetailAction.clearProductDetail())
    }
  }
}

const ProductDetailScreenConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailScreen)


export default ProductDetailScreenConnect