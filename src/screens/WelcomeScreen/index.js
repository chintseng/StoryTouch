import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ImageBackground, TouchableWithoutFeedback, Animated } from 'react-native';
import { Navigation } from 'react-native-navigation';
import styles from './styles';
import DefaultButton from '../../components/DefaultButton';
import Circle from '../../components/Circle';

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressing: false,
      x: 0,
      y: 0,
      radius: 15,
      radiusAnimate: new Animated.Value(15),
    };
    this.state.radiusAnimate.addListener(({ value }) => this.setState({ radius: value }));
  }

  onOpenCamera = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.storyTouch.CameraScreen',
        passProps: {
          text: 'Pushed screen',
        },
        options: {
          topBar: {
            title: {
              text: 'Camera',
            },
          },
        },
      },
    });
  }

  handleImageLongPress = (event) => {
    const { locationX: x, locationY: y } = event.nativeEvent;
    this.setState({ x, y, pressing: true });
    Animated.timing(this.state.radiusAnimate, {
      toValue: 300,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }

  handleImagePressOut = () => {
    this.setState({ pressing: false });
    this.state.radiusAnimate.setValue(15);
  }

  render() {
    const {
      x, y, radius, pressing,
    } = this.state;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onLongPress={this.handleImageLongPress}
          onPressOut={this.handleImagePressOut}
        >
          <ImageBackground
            style={{ width: '100%', height: 600 }}
            source={{ url: 'https://resizer.otstatic.com/v2/photos/huge/25763125.jpg' }}
          >
            {pressing && <Circle top={y - radius} left={x - radius} radius={radius} />}
          </ImageBackground>
        </TouchableWithoutFeedback>
        {/* <Text style={styles.welcome}>Welcome to StoryTouch!</Text>
        <Text style={styles.instructions}>To get started, click button</Text>
        <DefaultButton icon="camera" onPress={this.onOpenCamera}>Camera</DefaultButton> */}
      </View>
    );
  }
}

WelcomeScreen.propTypes = {
  componentId: PropTypes.string.isRequired,
};

