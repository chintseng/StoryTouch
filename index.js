/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { Navigation } from "react-native-navigation";
import App from "./App";
import STCamera from "./STCamera";
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponent(`navigation.storyTouch.WelcomeScreen`, () => (props) => (
  <Provider store={store}>
    <App {...props}/>
  </Provider>
), () => App);
Navigation.registerComponent(`navigation.storyTouch.CameraScreen`, () => (props) => (
  <Provider store={store}>
    <STCamera {...props}/>
  </Provider>
), () => STCamera);

console.disableYellowBox = true;
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
          id: 'Stack',
          children: [
              {
                component: {
                    name: "navigation.storyTouch.WelcomeScreen",
                    options: {
                        topBar: {
                            title: {
                                text: 'StoryTouch'
                            }
                        }
                    }
                }
              },
          ]
      }
      
    }
  });
});
