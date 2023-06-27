import React from 'react';
import { connect } from 'react-redux'
import { getHeaderBackIconColor } from '../redux/config'
//import { HeaderBackButton as ReactNavigationHeaderBackButton, withNavigation } from 'react-navigation';
import { HeaderBackButton as ReactNavigationHeaderBackButton } from '@react-navigation/elements';


class HeaderBackButtonContainer extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const {headerBackIconColor} = this.props
    return(
      <ReactNavigationHeaderBackButton onPress={() => this.props.navigation.goBack()} tintColor= {headerBackIconColor}/>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    headerBackIconColor: getHeaderBackIconColor(state)
  }
}

const HeaderBackButton = connect(
  mapStateToProps
)(HeaderBackButtonContainer)

export default HeaderBackButton


