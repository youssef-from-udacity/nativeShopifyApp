import React,{useState, useRef} from 'react';
import { StyledView } from './style'
import Search from '../react-native-search-box/index';
import { theme } from '../../constants/Theme'
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';


export default function SearchBox (props){
  const [searchInput,setSearchInput] = useState(props.defaultValue );
  const isFocused = useIsFocused();
  const searchBoxRef = useRef();
  
  const afterSearch = () => {
    return new Promise((resolve, reject) => {
      props.onPressSearch(searchInput)

      resolve();
    });
  }
  // Important: You must return a Promise
  const beforeFocus = () => {
    return new Promise((resolve, reject) => {
      if (props.beforeFocusSearch) {
        props.beforeFocusSearch()
      }
      resolve()
    });
  }
  const afterCancel = () => {
    return new Promise((resolve, reject) => {
      if (props.afterCancel) {
        props.afterCancel()
      }

      resolve();
    });
  }
  const changeTextInput = (text) => {
    setSearchInput(text)
  }


    return (
      isFocused &&
      <StyledView>
        <View style={{ backgroundColor: 'white' }}>
          <Search
            ref={searchBoxRef}
            backgroundColor={props.headerBackgroundColor}
            afterSearch={afterSearch}
            afterCancel={afterCancel}
            beforeFocus={beforeFocus}
            returnKeyType="search"
            onChangeText={(text) => changeTextInput(text)}
            defaultValue={props.defaultValue}
            titleCancelColor={props.headerIconColor}
          />
        </View>
      </StyledView>
    )

}

