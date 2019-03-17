/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Navigation } from "react-native-navigation";

export default class App extends Component {
  onOpenCamera() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.storyTouch.CameraScreen',
        passProps: {
          text: 'Pushed screen'
        },
        options: {
          topBar: {
            title: {
              text: 'Camera'
            }
          }
        }
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to StoryTouch!</Text>
        <Text style={styles.instructions}>To get started, click button</Text>
        <Button
          icon={
            <Icon
              name="camera"
              size={15}
              color="white"
              style={{
                margin: 10
              }}
            />
          }
          title="Camera"
          buttonStyle={{
            paddingRight: 15
          }}
          onPress={() => this.onOpenCamera()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
