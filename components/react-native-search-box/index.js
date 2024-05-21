import React, { PureComponent, createRef } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
  Keyboard,
  Image,
  View,
  ViewPropTypes
} from 'react-native';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      keyword: props.defaultValue,
      expanded: false,
    };
    const { width } = Dimensions.get('window');
    this.contentWidth = width;
    this.middleWidth = width / 2;
    this.cancelButtonWidth = this.props.cancelButtonWidth || 70;

    /**
     * Animated values
     */
    this.iconSearchAnimated = new Animated.Value(
      this.middleWidth - this.props.searchIconCollapsedMargin
    );
    this.iconDeleteAnimated = new Animated.Value(0);
    this.inputFocusWidthAnimated = new Animated.Value(this.contentWidth - 10);
    this.inputFocusPlaceholderAnimated = new Animated.Value(
      this.middleWidth - this.props.placeholderCollapsedMargin
    );
    this.btnCancelAnimated = new Animated.Value(this.contentWidth);

    /**
     * functions
     */
    this.onFocus = this.onFocus.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.focus = this.focus.bind(this);
    this.expandAnimation = this.expandAnimation.bind(this);
    this.collapseAnimation = this.collapseAnimation.bind(this);
    this.onLayout = this.onLayout.bind(this);

    /**
     * local variables
     */
    this.placeholder = this.props.placeholder || 'Search';
    this.cancelTitle = this.props.cancelTitle || 'Cancel';
    this.autoFocus =  this.props.autoFocus || false;

    /**
     * Shadow
     */
    this.shadowOpacityAnimated = new Animated.Value(
      this.props.shadowOpacityCollapsed
    );
    this.shadowHeight = this.props.shadowOffsetHeightCollapsed;
    this.input_keyword = createRef();
    this.searchContainer = createRef();
  }

  componentDidMount() {
    if(this.autoFocus) {
      this.setState({expanded: true})
      this.getInputRef().focus();

    }
  }

  // Required to support both react-native =>0.62 and <0.62
  getInputRef() {

    return !!this.input_keyword._component
      ? _component // <0.62
      : this.input_keyword // =>0.62
  }

  onLayout = event => {
    const contentWidth = event.nativeEvent.layout.width;
    this.contentWidth = contentWidth;
    this.middleWidth = contentWidth / 2;
    if (this.state.expanded) {
      this.expandAnimation();
    } else {
      this.collapseAnimation();
    }
  };

  /**
   * onSearch
   * async await
   */
  onSearch = async () => {
    this.props.beforeSearch &&
      (await this.props.beforeSearch(this.state.keyword));
    if (this.props.keyboardShouldPersist === false) {
      await Keyboard.dismiss();
    }
    this.props.onSearch && (await this.props.onSearch(this.state.keyword));
    this.props.afterSearch &&
      (await this.props.afterSearch(this.state.keyword));
  };

  /**
   * onChangeText
   * async await
   */
  onChangeText = async text => {
    await this.setState({ keyword: text });
    await new Promise((resolve, reject) => {
      Animated.timing(this.iconDeleteAnimated, {
        toValue: text.length > 0 ? 1 : 0,
        duration: 200,
        useNativeDriver: false
      }).start(() => resolve());
    });
    this.props.onChangeText &&
      (await this.props.onChangeText(this.state.keyword));
  };

  /**
   * onFocus
   * async await
   */
  onFocus = async () => {
    this.props.beforeFocus && (await this.props.beforeFocus());
    this.getInputRef().isFocused &&
      (await this.getInputRef().focus());
    await this.setState(prevState => {
      return { expanded: !prevState.expanded };
    });
    await this.expandAnimation();
    this.props.onFocus && (await this.props.onFocus(this.state.keyword));
    this.props.afterFocus && (await this.props.afterFocus());
  };

  /**
   * focus
   * async await
   */
  focus = async (text = '') => {
    await this.setState({ keyword: text });
    await this.getInputRef().focus();
  };

  /**
   * onDelete
   * async await
   */
  onDelete = async () => {
    this.props.beforeDelete && (await this.props.beforeDelete());
    await new Promise((resolve, reject) => {
      Animated.timing(this.iconDeleteAnimated, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      }).start(() => resolve());
    });
    await this.setState({ keyword: '' });
    this.props.onDelete && (await this.props.onDelete());
    this.props.afterDelete && (await this.props.afterDelete());
  };

  /**
   * onCancel
   * async await
   */
  onCancel = async () => {
    this.props.beforeCancel && (await this.props.beforeCancel());
    await this.setState({ keyword: '' });
    await this.setState(prevState => {
      return { expanded: !prevState.expanded };
    });
    await this.collapseAnimation(true);
    this.props.onCancel && (await this.props.onCancel());
    this.props.afterCancel && (await this.props.afterCancel());
  };

  expandAnimation = () => {
    return new Promise((resolve, reject) => {
      Animated.parallel([
        Animated.timing(this.inputFocusWidthAnimated, {
          toValue: this.contentWidth - this.cancelButtonWidth,
          duration: 200,
          useNativeDriver: false
        }).start(),
        Animated.timing(this.btnCancelAnimated, {
          toValue: 10,
          duration: 200,
          useNativeDriver: false
        }).start(),
        Animated.timing(this.inputFocusPlaceholderAnimated, {
          toValue: this.props.placeholderExpandedMargin,
          duration: 200,
          useNativeDriver: false
        }).start(),
        Animated.timing(this.iconSearchAnimated, {
          toValue: this.props.searchIconExpandedMargin,
          duration: 200,
          useNativeDriver: false
        }).start(),
        Animated.timing(this.iconDeleteAnimated, {
          toValue: this.state.keyword.length > 0 ? 1 : 0,
          duration: 200,
          useNativeDriver: false
        }).start(),
        Animated.timing(this.shadowOpacityAnimated, {
          toValue: this.props.shadowOpacityExpanded,
          duration: 200,
          useNativeDriver: false
        }).start()
      ]);
      this.shadowHeight = this.props.shadowOffsetHeightExpanded;
      resolve();
    });
  };

  collapseAnimation = (isForceAnim = false) => {
    return new Promise((resolve, reject) => {
      Animated.parallel([
        this.props.keyboardShouldPersist === false ? Keyboard.dismiss() : null,
        Animated.timing(this.inputFocusWidthAnimated, {
          toValue: this.contentWidth - 10,
          duration: 20,
          useNativeDriver: false
        }).start(),
        Animated.timing(this.btnCancelAnimated, {
          toValue: this.contentWidth,
          duration: 200,
          useNativeDriver: false
        }).start(),
        this.props.keyboardShouldPersist === false
          ? Animated.timing(this.inputFocusPlaceholderAnimated, {
              toValue: this.middleWidth - this.props.placeholderCollapsedMargin,
              duration: 200,
              useNativeDriver: false
            }).start()
          : null,
        this.props.keyboardShouldPersist === false || isForceAnim === true
          ? Animated.timing(this.iconSearchAnimated, {
              toValue: this.middleWidth - this.props.searchIconCollapsedMargin,
              duration: 200,
              useNativeDriver: false
            }).start()
          : null,
        Animated.timing(this.iconDeleteAnimated, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false
        }).start(),
        Animated.timing(this.shadowOpacityAnimated, {
          toValue: this.props.shadowOpacityCollapsed,
          duration: 200,
          useNativeDriver: false
        }).start()
      ]);
      this.shadowHeight = this.props.shadowOffsetHeightCollapsed;
      resolve();
    });
  };

  render() {
    const isRtl = this.props.direction === 'rtl';
    const styles = getStyles(this.props.inputHeight, isRtl);
    return (
      <Animated.View
        ref={this.searchContainer}
        style={[
          styles.container,
          this.props.backgroundColor && {
            backgroundColor: this.props.backgroundColor
          }
        ]}
        onLayout={this.onLayout}
      >
        <AnimatedTextInput
          ref={this.input_keyword}
          style={[
            styles.input,
            this.props.placeholderTextColor && {
              color: this.props.placeholderTextColor
            },
            this.props.inputStyle && this.props.inputStyle,
            this.props.inputHeight && { height: this.props.inputHeight },
            this.props.inputBorderRadius && {
              borderRadius: this.props.inputBorderRadius
            },
            {
              width: this.inputFocusWidthAnimated,
              [isRtl ? 'paddingRight' : 'paddingLeft']: this.inputFocusPlaceholderAnimated
            },
            this.props.shadowVisible && {
              shadowOffset: {
                width: this.props.shadowOffsetWidth,
                height: this.shadowHeight
              },
              shadowColor: this.props.shadowColor,
              shadowOpacity: this.shadowOpacityAnimated,
              shadowRadius: this.props.shadowRadius
            }
          ]}
          editable={this.props.editable}
          value={this.state.keyword}
          onChangeText={this.onChangeText}
          placeholder={this.placeholder}
          placeholderTextColor={
            this.props.placeholderTextColor || styles.placeholderColor
          }
          selectionColor={this.props.selectionColor}
          onSubmitEditing={this.onSearch}
          autoCorrect={false}
          blurOnSubmit={this.props.blurOnSubmit}
          returnKeyType={this.props.returnKeyType || 'search'}
          keyboardType={this.props.keyboardType || 'default'}
          keyboardAppearance={this.props.keyboardAppearance || 'default'}
          autoCapitalize={this.props.autoCapitalize}
          onFocus={this.onFocus}
          underlineColorAndroid="transparent"
          accessibilityTraits="search"
        />
        <TouchableWithoutFeedback onPress={this.onFocus}>
        {this.props.iconSearch
          ? <Animated.View
              style={[styles.iconSearch, { left: this.iconSearchAnimated }]}
            >
              {this.props.iconSearch}
            </Animated.View>
          : <Animated.Image
              source={require('./img/search.png')}
              style={[
                styles.iconSearch,
                styles.iconSearchDefault,
                this.props.tintColorSearch && {
                  tintColor: this.props.tintColorSearch
                },
                {
                  left: this.iconSearchAnimated
                }
              ]}
            />}
          </TouchableWithoutFeedback>
        {this.props.useClearButton && <TouchableWithoutFeedback onPress={this.onDelete}>
          {this.props.iconDelete
            ? <Animated.View
                style={[
                  styles.iconDelete,
                  this.props.positionRightDelete && {
                    [isRtl ? 'left' : 'right']: this.props.positionRightDelete
                  },
                  { opacity: this.iconDeleteAnimated }
                ]}
              >
                {this.props.iconDelete}
              </Animated.View>
            : <Animated.Image
                source={require('./img/delete.png')}
                style={[
                  styles.iconDelete,
                  styles.iconDeleteDefault,
                  this.props.tintColorDelete && {
                    tintColor: this.props.tintColorDelete
                  },
                  this.props.positionRightDelete && {
                    [isRtl ? 'left' : 'right']: this.props.positionRightDelete
                  },
                  { opacity: this.iconDeleteAnimated }
                ]}
              />}
        </TouchableWithoutFeedback>}

        <TouchableOpacity onPress={this.onCancel}>
          <Animated.View
            style={[
              styles.cancelButton,
              this.props.cancelButtonStyle && this.props.cancelButtonStyle,
              this.props.cancelButtonViewStyle && this.props.cancelButtonViewStyle,
              { [isRtl ? 'right' : 'left']: this.btnCancelAnimated },
            ]}
          >
            <Text
              style={[
                styles.cancelButtonText,
                this.props.titleCancelColor && {
                  color: this.props.titleCancelColor
                },
                this.props.cancelButtonStyle && this.props.cancelButtonStyle,
                this.props.cancelButtonTextStyle && this.props.cancelButtonTextStyle,
              ]}
            >
              {this.cancelTitle}
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const getStyles = (inputHeight, isRtl) => {
  let middleHeight = 20
  if (typeof inputHeight == 'number') {
    middleHeight = (10 + inputHeight) / 2;
  } else{
    // Default value for when prop value is not present
    inputHeight = 30
  }

  return {
    container: {
      backgroundColor: 'grey',
      height: inputHeight + 10,
      flexDirection: isRtl ? 'row-reverse' : 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 5
    },
    input: {
      height: inputHeight,
      paddingTop: 5,
      paddingBottom: 5,
      [isRtl ? 'paddingRight' : 'paddingLeft']: 20,
      textAlign: isRtl ? 'right' : 'left',
      borderColor: '#444',
      backgroundColor: '#f7f7f7',
      borderRadius: 5,
      fontSize: 13
    },
    placeholderColor: 'grey',
    iconSearch: {
      flex: 1,
      position: 'absolute',
      top: middleHeight - 7,
      height: 14,
      width: 14
    },
    iconSearchDefault: {
      tintColor: 'grey'
    },
    iconDelete: {
      position: 'absolute',
      [isRtl ? 'left' : 'right']: 70,
      top: middleHeight - 7,
      height: 14,
      width: 14
    },
    iconDeleteDefault: {
      tintColor: 'grey'
    },
    cancelButton: {
      justifyContent: 'center',
      alignItems: isRtl ? 'flex-end' : 'flex-start',
      backgroundColor: 'transparent',
      width: 60,
      height: 50
    },
    cancelButtonText: {
      fontSize: 14,
      color: '#fff'
    }
  };
}


Search.defaultProps = {
  defaultValue: '',
  editable: true,
  blurOnSubmit: true,
  keyboardShouldPersist: false,
  searchIconCollapsedMargin: 25,
  searchIconExpandedMargin: 10,
  placeholderCollapsedMargin: 15,
  placeholderExpandedMargin: 20,
  shadowOffsetWidth: 0,
  shadowOffsetHeightCollapsed: 2,
  shadowOffsetHeightExpanded: 4,
  shadowColor: '#000',
  shadowOpacityCollapsed: 0.12,
  shadowOpacityExpanded: 0.24,
  shadowRadius: 4,
  shadowVisible: false,
  useClearButton: true,
  direction: 'ltr',
};

export default Search;
