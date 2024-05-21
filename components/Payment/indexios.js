import React from 'react';

import { WebView } from 'react-native-webview';


export class PaymentComponent extends React.Component {
    constructor(props){
        super(props)
    }
    navigationStateChangedHandler = ({url}) => {

        if (url.includes('checkouts') && url.includes('thank_you')) {
            this.props.paymentCompleted()
        }else if(url.includes('login')){
            //Go to login page
            this.props.goToLogin()
            this.WebView.stopLoading();
            this.WebView.goBack();
        }
      };
    componentWillUnmount = () => {
        this.WebView.source = 'https://aslkdfjlasdfj.myshopify.com/account/logout'
    }
    
    render() {

        return(
                <WebView
                source={{
                    uri: this.props.url,

                }}
                onNavigationStateChange={this.navigationStateChangedHandler}
                ref={c => {
                    this.WebView = c;
                  }}
                startInLoadingState={true}
                />

        )
    }

}

