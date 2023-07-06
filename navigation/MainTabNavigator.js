import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarBottomContainer from '../containers/TabBarBottom';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import PolicyScreen from '../screens/PolicyScreen';
import Icon from '../containers/Icon'
import HeaderBackButton from '../containers/HeaderBackButton'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

const MainStack = () => {
  return (

    <Tab.Navigator
      screenOptions={{
        lazy: false,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
      tabBar={(props) => (
        <TabBarBottomContainer {...props} style={{ borderTopColor: '#605F60' }} />
      )}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (<Icon
          focused={focused}
          name='md-home'
          icon='Ionicon'
        />
        )
      }} />
      
      <Tab.Screen name="CollectionStack" component={CollectionScreen} options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ focused }) => (
          <Icon
            focused={focused}
            name='search'
            icon='Materialicon'
          />
        )
      }} />
      <Tab.Screen name="ShoppingCart" component={ShoppingCartScreen} options={{
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