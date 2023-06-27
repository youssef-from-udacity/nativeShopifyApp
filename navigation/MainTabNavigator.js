import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

//import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import TabBarBottomContainer from '../containers/TabBarBottom'
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
//import CartCounterContainer  from '../containers/CartCounter'
import PolicyScreen from '../screens/PolicyScreen';
import Icon from '../containers/Icon'
import HeaderBackButton from '../containers/HeaderBackButton'

//const HomeStack = createStackNavigator({
//  Home: HomeScreen,
//},);
//
//
//HomeStack.navigationOptions = {
//  tabBarLabel: 'Home',
////  tabBarIcon: ({ focused }) => (
////    <Icon
////      focused={focused}
////      name='md-home'
////      icon='Ionicon'
////    />
////  ),
////};
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
const CollectionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={CollectionScreen} />

    </Stack.Navigator>
  );
};
const ShoppingCartStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ShoppingCart" component={ShoppingCartScreen} />
    </Stack.Navigator>
  );
};
//const CollectionStack = createStackNavigator({
//  Collection: CollectionStack,
//});
//
//
//CollectionStack.navigationOptions = {
//  tabBarLabel: 'Search',
//  tabBarIcon: ({ focused }) => (
//    <Icon
//      focused={focused}
//      name='search'
//      icon='Materialicon'
//    />    
//  ),
//};
//
//const ShoppingCartStack = createStackNavigator({
//  ShoppingCart: ShoppingCartScreen,
//},);
//
//
//ShoppingCartStack.navigationOptions = {
//  tabBarLabel: 'Shopping Cart',
//  tabBarIcon: ({ focused }) => (
//    <View>
//      <Icon
//        focused={focused}
//        name='shopping-cart'
//        icon='Materialicon'
//      />  
//      <CartCounterContainer/>
//    </View>
//
//  ),
//};
//
//
//const PolicyStack = createStackNavigator({
//  Policy: PolicyScreen
//},{
//  defaultNavigationOptions: ({navigation}) => ({
//    headerLeft: <HeaderBackButton/>,
//  })
//});
//

//const AccountStack = createStackNavigator({
//  Account: AccountScreen,
//  Policy: PolicyStack
//},{
//  headerMode: 'none',
//});
//
//AccountStack.navigationOptions = {
//  tabBarLabel: 'Account',
//  tabBarIcon: ({ focused }) => (
//    <Icon
//    focused={focused}
//    name='account-box'
//    icon='Materialicon'
//    /> 
//  ),
//};
const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Policy" component={PolicyScreen} options={(navigation) => ({
        headerLeft: () => (<HeaderBackButton {...navigation} />),
      })} />

    </Stack.Navigator>
  );
};
//
//const bTabNavigator = createBottomTabNavigator({
//  HomeStack,
//  CollectionStack,
//  ShoppingCartStack,
//  AccountStack,
//},{
//  lazy: false,
//  tabBarComponent: props =>
//  <TabBarBottomContainer
//    {...props}
//    style={{ borderTopColor: '#605F60' }}
//  />,
//  tabBarOptions: {
//    showLabel: false,
//    labelStyle: {
//      fontSize: 12,
//    },
//  }
//  
//});
//
const MainStack = () => {
  return (

    <Tab.Navigator
      screenOptions={{
        lazy: false,
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
      tabBar={(props) => (
        <TabBarBottomContainer {...props} style={{ borderTopColor: '#605F60' }} />
      )}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (<Icon
          focused={focused}
          name='md-home'
          icon='Ionicon'
        />
        )
      }} />
      
      <Tab.Screen name="CollectionStack" component={CollectionStack} options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ focused }) => (
          <Icon
            focused={focused}
            name='search'
            icon='Materialicon'
          />
        )
      }} />
      <Tab.Screen name="ShoppingCartStack" component={ShoppingCartStack} options={{
        tabBarLabel: 'ShoppingCart',
        tabBarIcon: ({ focused }) => (
          <Icon
            focused={focused}
            name='shopping-cart'
            icon='Materialicon'
          />
        )
      }} />
      <Tab.Screen name="AccountStack" component={AccountStack} options={{
        tabBarIcon: ({ focused }) => (
          <Icon
            focused={focused}
            name='account-box'
            icon='Materialicon'
          />
        )
      }} />

    </Tab.Navigator>
  )
}
export default MainStack;