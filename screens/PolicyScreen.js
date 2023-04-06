import React from 'react';
import { ScrollView, SafeAreaView, SectionList, Text, View, TouchableOpacity, Alert } from 'react-native'
import { theme } from '../constants/Theme'
import { connect } from 'react-redux'
import { getShopUrl } from '../redux/shop'
import { WebView } from 'react-native-webview';

const SHOPIFY_STOREFRONT_ACCESS_TOKEN= process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

class Policy extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.route.params.title,
  });
  constructor(props) {
    super(props)
    this.state = {
      body: ''
    }
  }
  componentDidMount() {

    if (this.props.route.params?.title === 'Privacy Policy') {
      this.getPrivacyPolicy()
    }
    switch (this.props.route.params?.title) {
      case 'Privacy Policy':
        this.getPrivacyPolicy()
        break;
      case 'Refund Policy':
        this.getRefundPolicy()
        break;
      case 'Terms of Service':
        this.getTermsOfService()
        break;
    }


  }

  getPrivacyPolicy = () => {
    fetch(this.props.shopifyUrl + '/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: `
      {
        shop {
          privacyPolicy{
          body
          title
          }
        }
      }
    `,
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ body: responseJson.data.shop.privacyPolicy.body })
      })
  }


  getRefundPolicy = () => {
    fetch(this.props.shopifyUrl + '/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: `
      {
        shop {
          refundPolicy{
          body
          title
          }
        }
      }
    `,
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ body: responseJson.data.shop.refundPolicy.body })
      })
  }

  getTermsOfService = () => {
    fetch(this.props.shopifyUrl + '/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: `
      {
        shop {
          termsOfService{
          body
          title
          }
        }
      }
    `,
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ body: responseJson.data.shop.termsOfService.body })
      })
  }


  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          originWhitelist={['*']}
          source={{ html: this.state.body }}
          scalesPageToFit={false}
          style={{paddingVertical: 20}}
        />
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => {
  return {
    shopifyUrl: getShopUrl(state)
  }
}


const mapDispatchToProps = dispatch => {
  return {}
}

const PolicyScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Policy)
export default PolicyScreen