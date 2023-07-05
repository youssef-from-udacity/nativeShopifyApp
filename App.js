import {useState} from 'react'
import { StyleSheet, View, Platform } from 'react-native'

import * as SplashScreen from 'expo-splash-screen';

import Ionicons from '@expo/vector-icons/Ionicons';


import { Asset } from 'expo-asset';
import * as Font from 'expo-font';


import RootContainer from './containers/RootContainer'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import reducer from './redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';
import { theme } from './constants/Theme'
import { ThemeProvider } from 'styled-components'
import { StatusBar } from 'react-native'

const logger = store => next => action => {
  //console.log('prev state', store.getState())
  console.log('dispatching', action)
  let result = next(action)
  //console.log('next state', store.getState())
  return result
}

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer,
  middleware:[logger, sagaMiddleware]
}
  )

sagaMiddleware.run(rootSaga)

function App (props){
  const isLoadingComplete = useState(false)
  _loadResourcesAsync = async () => {
    SplashScreen.preventAutoHideAsync();

    try{

      await Promise.all([
        Asset.loadAsync([
          require('./assets/images/robot-dev.png'),
          require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
          // This is the font that we are using for our tab bar
          ...Ionicons.font,
          // We include SpaceMono because we use it in HomeScreen.js. Feel free
          // to remove this if you are not using it in your app
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        }),
      ]);
    }catch(e){
      console.warn(e);
    }finally{
      setState(true)
    }

  };
  _handleLayoutView = async()=>{
    isLoadingComplete&&await SplashScreen.hideAsync();
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
  if (!isLoadingComplete) {
    // Keep the splash screen visible while we fetch resources
    _loadResourcesAsync();
    
  } else {
    
    return (
      <View style={styles.container} onLayout={_handleLayoutView}>
         <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <RootContainer />
          </Provider>
        </ThemeProvider>
      </View>
    );
  }
}


export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
