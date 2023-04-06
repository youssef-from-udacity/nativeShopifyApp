import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './MainTabNavigator';
import React from 'react';
import ProductDetailScreen from '../screens/ProductDetailScreen'
import ProductDescriptionScreen from '../screens/ProductDescriptionScreen'
import ProductListScreen from '../screens/ProductListScreen'
import PaymentScreen from '../screens/PaymentScreen'
import LoginScreen from '../screens/LoginScreen'
import ShopifyInstallScreen from '../screens/ShopifyInstallScreen'
import AddAddressScreen from '../screens/AddAddressScreen'
import AddressScreen from '../screens/AddressScreen'
import AddNewAddressScreen from '../screens/AddNewAddressScreen'
import HeaderBackButton from '../containers/HeaderBackButton'
import OrderListScreen from '../screens/OrderListScreen'
import OrderDetailScreen from '../screens/OrderDetailScreen'
import ChangeColorScreen from '../screens/ChangeColorScreen'

const ProductDetailStack = () => {
  return (
    <Stack.Navigator screenOptions={(navigation) => ({
      headerLeft: () => (<HeaderBackButton {...navigation} />),
      headerTitle: 'Product Detail',
    })}>
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name="ProductDescriptionScreen"
        component={ProductDescriptionScreen}
      />
    </Stack.Navigator>
  );
};

const ProductListStack = () => {
  return (
    <Stack.Navigator screenOptions={(navigation) => ({
      headerLeft: () => (<HeaderBackButton {...navigation} />),
    })}>
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const PaymentStack = () => {
  return (
    <Stack.Navigator screenOptions={(navigation) => ({
      headerLeft: () => (<HeaderBackButton {...navigation} />),
    })}>
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
      />
    </Stack.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator screenOptions={(navigation) => ({
      headerLeft: () => (<HeaderBackButton {...navigation} />),
    })}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};
const AddressScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={(navigation) => ({
      headerLeft: () => (<HeaderBackButton {...navigation} />),
      mode: 'modal',

    })}>
      <Stack.Screen
          name="AddressScreen"
          component={AddressScreen}
        />
      <Stack.Screen
          name="AddNewAddressScreen"
          component={AddNewAddressScreen}
        />
    </Stack.Navigator>
  );
};

const OrderScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrderListScreen"
        component={OrderListScreen}
        options={(navigation) => ({
          headerLeft: () => (<HeaderBackButton {...navigation} />),
          mode: 'modal',
        })}
      />
      <Stack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={(navigation) => ({
          headerLeft: () => (<HeaderBackButton {...navigation} />),
          mode: 'modal',
        })}
      />
    </Stack.Navigator>
  );
};
const Stack = createNativeStackNavigator();     

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          //animationEnabled: false,
          animation: 'slide_from_right',
          presentation: 'card'
        }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Product" component={ProductDetailStack} />
        <Stack.Screen name="ProductList" component={ProductListStack} />
        <Stack.Screen name="Payment" component={PaymentStack} />
        <Stack.Screen name="Login" component={LoginStack} />
        <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
        <Stack.Screen name="AddressScreenStack" component={AddressScreenStack} />
        <Stack.Screen name="OrderScreen" component={OrderScreenStack} />
        <Stack.Screen
          name="ChangeColorScreen"
          component={ChangeColorScreen}
          options={(navigation) => ({
            headerLeft: () => (<HeaderBackButton {...navigation} />),
          })}
        />

        <Stack.Screen
          name="ShopifyInstallScreen"
          component={ShopifyInstallScreen}
          options={(navigation) => ({
            headerLeft: () => (<HeaderBackButton {...navigation} />),
            mode: 'modal',
          })}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default AppNavigator;
