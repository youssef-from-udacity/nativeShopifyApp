import React from 'react';
import { WebView } from 'react-native'

export class PaymentComponent extends React.Component {
    constructor(props){
        super(props)
    }
    navigationStateChangedHandler = ({url}) => {
        if (url.includes('checkouts') && url.includes('thank_you')) {
            this.props.paymentCompleted()
        }else if(url.includes('login')){
            //Go to login page
            this.WebView.stopLoading();
            this.WebView.goBack();
        }
      };

    render() {
        return(
                <WebView
                source={{
                    uri: this.props.url,
                    headers:{
                        'X-Shopify-Customer-Access-Token': this.props.userAccessToken
                    }
                }}
                javaScriptEnabledAndroid={true}
                onNavigationStateChange={this.navigationStateChangedHandler}
                ref={c => {
                    this.WebView = c;
                  }}
                />

        )
    }

}

