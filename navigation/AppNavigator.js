// import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MainTabNavigator from './MainTabNavigator';
import PlaceItem from './PlaceItem';
import React from 'react';
import ProductDetailScreen from '../screens/ProductDetailScreen'
import ProductDescriptionScreen from '../screens/ProductDescriptionScreen'
import ProductListScreen from '../screens/ProductListScreen'
import PaymentScreen from '../screens/PaymentScreen'
import LoginScreen from '../screens/LoginScreen'
import ShopifyInstallScreen from '../screens/ShopifyInstallScreen'
//import RegisterScreen from '../screens/RegisterScreen'
import AddAddressScreen from '../screens/AddAddressScreen'
import AddressScreen from '../screens/AddressScreen'
//import AddNewAddressScreen from '../screens/AddNewAddressScreen'
import HeaderBackButton from '../containers/HeaderBackButton'
//import {Platform} from 'react-native';
import OrderListScreen from '../screens/OrderListScreen'
import OrderDetailScreen from '../screens/OrderDetailScreen'
import ChangeColorScreen from '../screens/ChangeColorScreen'
//
//const ProductDetailStack = createStackNavigator({
//  ProductDetailScreen: ProductDetailScreen,
//  ProductDescriptionScreen: ProductDescriptionScreen,
//},{
//  defaultNavigationOptions: ({navigation}) => ({
//    headerTitle: 'Product Detail',
//    headerLeft: <HeaderBackButton/>,
//    headerTransparent: false,
//    headerStyle: {
//   
//    },
//    headerTitleStyle: {
//  
//    },
//  })
//})
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
//
//
//const ProductListStack = createStackNavigator({
//  ProductListScreen: ProductListScreen,
//},{
//})
//
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
//const PaymentStack = createStackNavigator({
//  PaymentScreen: PaymentScreen,
//},{
//  defaultNavigationOptions: ({navigation}) => ({
//    headerLeft: <HeaderBackButton/>,
//  })
//})
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
//const ChangeColorStack = createStackNavigator({
//  ChangeColorScreen: ChangeColorScreen,
//},{
//  defaultNavigationOptions: ({navigation}) => ({
//    headerLeft: <HeaderBackButton/>,
//  })
//})
//

//
//const AddAdressScreenStack = createStackNavigator({
//  AddAddressScreen: AddAddressScreen,
//},{
//  defaultNavigationOptions: ({navigation}) => ({
//    headerLeft: <HeaderBackButton/>,
//  })
//})
//
const AddAdressScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={(navigation) => ({
      headerLeft: () => (<HeaderBackButton {...navigation} />),
    })}>
      <Stack.Screen
        name="AddAddressScreen"
        component={AddAddressScreen}
      />
    </Stack.Navigator>
  );
};
//const LoginStack = createStackNavigator({
//  LoginScreen: LoginScreen,
//  RegisterScreen: RegisterScreen
//},{
//  defaultNavigationOptions: ({navigation}) => ({
//    headerLeft: <HeaderBackButton/>,
//    mode: 'modal',
//    
//  }),
//})
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
//const ShopifyInstallStack = createStackNavigator({
//  ShopifyInstallScreen: ShopifyInstallScreen,
//},{
//  defaultNavigationOptions: ({navigation}) => ({
//    headerLeft: <HeaderBackButton/>,
//    mode: 'modal',
//    
//  }),
//})
//

//const AddressScreenStack = createStackNavigator({
//  AddressScreen: AddressScreen,
//  AddNewAddressScreen: AddNewAddressScreen,
//},{
//  defaultNavigationOptions: ({navigation}) => ({
//    headerLeft: <HeaderBackButton/>,
//    mode: 'modal',
//    
//  }),
//})

//const OrderScreenStack = createStackNavigator({
//  OrderListScreen: OrderListScreen,
//  OrderDetailScreen: OrderDetailScreen
//},{
//  defaultNavigationOptions: ({navigation}) => ({
//    headerLeft: <HeaderBackButton/>,
//    mode: 'modal',
//    
//  }),
//})
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
const Stack = createStackNavigator();      //It is used to create a stack navigator, a type of navigation container that manages a stack of screens in a hierarchical manner.
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          animationEnabled: false,

        }}>
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Product" component={ProductDetailStack} />
        <Stack.Screen name="ProductList" component={ProductListStack} />
        <Stack.Screen name="Payment" component={PaymentStack} />
        <Stack.Screen name="Login" component={LoginStack} />
        <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} />
        <Stack.Screen
          name="AddressScreen"
          component={AddressScreen}
          options={(navigation) => ({
            headerLeft: () => (<HeaderBackButton {...navigation} />),
            mode: 'modal',
          })}
        />
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
//const MainStack = createStackNavigator({
//  Main: MainTabNavigator,
//Product: ProductDetailStack,
//ProductList: ProductListStack,
//Payment: PaymentStack,
//Login: LoginStack,
//AddAddressScreen: AddAdressScreenStack,
//AddressScreen: AddressScreenStack,
//OrderScreen: OrderScreenStack,
//ChangeColorScreen: ChangeColorStack,
//ShopifyInstallStack: ShopifyInstallStack,
//},{
//  headerMode: 'none',
//  transitionConfig: () => ({
//    transitionSpec: {
//      ...Platform.select({
//        android: {
//          duration: 0,
//        },
//        
//      }),
//        // Set the animation duration time as 0 !!
//    },
//  }),
//})



// const switchNavigator =  createSwitchNavigator({
// You could add another route here for authentication.
// Read more at https://reactnavigation.org/docs/en/auth-flow.html
// MainStack
// });

export default App;
