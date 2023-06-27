import React from 'react';
import { Icon } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';

import { theme } from '../../../constants/Theme'
import styles from './style'
export default class Ioniconse extends React.Component {
  render() {
    return (
      <Ionicons
        name={this.props.name}
        size={26}
        style={ styles.icon }
        color={this.props.focused ? this.props.activeColor : this.props.inactiveColor }
      />
    );
  }
}