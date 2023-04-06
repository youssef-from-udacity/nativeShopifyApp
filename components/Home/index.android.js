import React from 'react';
import { View,Text } from 'react-native'
import { WebView } from 'react-native-webview';

import HomePlaceholder from '../Placeholder/HomePlaceholder';

export class HomeComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = { key: 1, scroll: 0, sx: 0, sy: 0, showLoading: false}
    }
    loadingIndicator = () => {
      return (
          <HomePlaceholder/>
        )
    }

    navigationStateChangedHandler = (navState) => {

        const url = navState.url.replace(/\/+$/, "");
        const loading = navState.loading
       if(!loading){
           this.setState({...this.state,showLoading: false})
       }

        if(url != this.props.shopUrl){
           this.setState({...this.state,key: this.state.key + 1})
        }
        if (url.includes('products') ) {
            const urls = url.split('/');
            const handle = urls[urls.length-1]
            this.props.handleProductClick(handle)
        }else if(url.includes('collections') ){

            const urls = url.split('/');
            const handle = urls[urls.length-1]
            this.props.handleCollectionClick(handle)
        }
      };
    onMessage = (event) => {

        if(event.includes("Opal") && event.includes(",")){
            const coordinate = event.split(',');
            this.setState({...this.state, sx: coordinate[0], sy: coordinate[1], showLoading: true})
        }
       
        
    }

    componentDidUpdate(prevProps){
        if(prevProps.shopUrl != this.props.shopUrl){
            this.setState({...this.state,key: this.state.key + 1})
        }
    }
    //handleShouldStartLoadWithRequest = (event) => {
    //  this.navigationStateChangedHandler(event);
    //  
    //  // Allow other types of requests
    //  return false;
    //};
    handleShouldStartLoadWithRequest = (navigator) => {
      this.navigationStateChangedHandler(navigator);
      return false;
    };


    render() {
        const jsCode = `
            window.scrollTo(${this.state.sx}, ${this.state.sy});
            window.addEventListener("beforeunload", function (event) {
                        var sx, sy, d = document,
                        r = d.documentElement,
                        b = d.body;
                        sx = r.scrollLeft || b.scrollLeft || 0;
                        sy = r.scrollTop || b.scrollTop || 0;
                        window.postMessage(sx.toString() + ","+ sy.toString() + ",Opal");
                      });                  
            window.postMessage = String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            document.getElementsByTagName('sticky-header')[0].style.display = "none";
            document.getElementsByTagName('footer')[0].style.display = "none";

        `;
        
        return(
                <View style={{height:'100%'}}>
                { this.state.showLoading && this.loadingIndicator()}
                <WebView
                key = {this.state.key}
                source={{uri: this.props.shopUrl}}
                injectedJavaScript={jsCode}
                javaScriptEnabledAndroid={true}
                onNavigationStateChange={this.navigationStateChangedHandler}
                onMessage={(event) => this.onMessage(event.nativeEvent.data)}
                startInLoadingState={true}
                renderLoading={this.loadingIndicator}
                onShouldStartLoadWithRequest={this.handleShouldStartLoadWithRequest}

                ref={c => {
                    this.WebView = c;
                  }}
                />

                </View>

        )
        
    }

}

