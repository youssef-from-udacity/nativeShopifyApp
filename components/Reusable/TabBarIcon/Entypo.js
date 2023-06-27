import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { theme } from '../../../constants/Theme'
import styles from './style'
export default class Entypo extends React.Component {
  render() {
    return (
      <Ionicons.Entypo
        name={this.props.name}
        size={26}
        style={ styles.icon }
        color={this.props.focused ? this.props.activeColor : this.props.inactiveColor  }
      />
    );
  }
}