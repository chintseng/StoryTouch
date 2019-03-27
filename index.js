/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import CameraScreen from './src/screens/CameraScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import configureStore from './src/store/configureStore';
import WelcomeScreen from './src/screens/WelcomeScreen';

const store = configureStore();

Navigation.registerComponent('navigation.storyTouch.WelcomeScreen', () => props => (
  <Provider store={store}>
    <WelcomeScreen {...props} />
  </Provider>
), () => WelcomeScreen);
Navigation.registerComponent('navigation.storyTouch.CameraScreen', () => props => (
  <Provider store={store}>
    <CameraScreen {...props} />
  </Provider>
), () => CameraScreen);

Navigation.registerComponent('navigation.storyTouch.PreviewScreen', () => props => (
  <Provider store={store}>
    <PreviewScreen {...props} />
  </Provider>
), () => PreviewScreen);

console.disableYellowBox = true;
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Stack',
        children: [
          {
            component: {
              name: 'navigation.storyTouch.WelcomeScreen',
              options: {
                topBar: {
                  title: {
                    text: 'StoryTouch',
                  },
                },
              },
            },
          },
        ],
      },

    },
  });
});
