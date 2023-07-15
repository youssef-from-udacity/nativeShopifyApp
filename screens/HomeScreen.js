
import React, { Component, useEffect, useRef } from 'react'


import { connect } from 'react-redux'
import { HomeComponent } from '../components/Home'
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { getName, getShopUrl, getFinishLoad } from '../redux/shop'
//import HomeCategoriesContainer from '../containers/HomeCategories'
//import BestSellingProductsContainer from '../containers/BestSellingProducts'
//import LatestProductsContainer from '../containers/LatestProducts'
import { theme } from '../constants/Theme';
//import HomePlaceholder from '../components/Placeholder/HomePlaceholder';
import { getHeaderBackgroundColor } from '../redux/config';


function Home(props) {
  const prevPropsRef = useRef(null);

  useEffect(() => {
    if (prevPropsRef.current) {
      const prevProps = prevPropsRef.current;

      if (prevProps.shopName != props.shopName) {
        props.navigation.setParams({ title: props.shopName });
      }
    }
    prevPropsRef.current = props;
  }, [props]);

  useEffect(() => {
    props.navigation.setParams({ color: props.headerBackroundColor, title: props.shopName });
  }, [])
  handleProductClick = (handle) => {

    props.navigation.navigate('Product', {
      screen: 'ProductDetailScreen',
      params: {
        handle: handle
      }
    })
  }
  handleCollectionClick = (handle) => {
    this.props.navigation.navigate('ProductList', {
      screen: 'ProductListScreen', params: {
        handle: handle
      }
    })
  }
  renderHomePage = (finishLoad) => {

    if (finishLoad) {
      return (
        <ScrollView style={{ backgroundColor: theme.listBackground }}>
          <HomeCategoriesContainer />
          <BestSellingProductsContainer />
          <LatestProductsContainer />
        </ScrollView>
      )
    } else {
      return (<HomePlaceholder />)
    }

  }
  return (
    <HomeComponent handleProductClick={handleProductClick} handleCollectionClick={handleCollectionClick} shopUrl={props.shopUrl} />
  )
}

const mapStateToProps = state => {
  return {
    shopName: getName(state),
    shopUrl: getShopUrl(state),
    finishLoad: getFinishLoad(state),
    headerBackroundColor: getHeaderBackgroundColor(state)
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

const HomeScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeScreen;