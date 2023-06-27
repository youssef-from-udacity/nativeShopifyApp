import React from 'react';
import { Icon } from 'expo';
import styles from './style'
import { theme } from '../../../constants/Theme'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default class MaterialIcon extends React.Component {
  render() {
    return (
      <MaterialIcons
        name={this.props.name}
        size={26}
        style={ styles.icon }
        color={this.props.focused ? this.props.activeColor : this.props.inactiveColor }
      />
    );
  }
}