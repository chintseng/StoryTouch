import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import CameraScreen from './src/screens/CameraScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import configureStore from './src/store/configureStore';
import WelcomeScreen from './src/screens/WelcomeScreen';
import InteractScreen from './src/screens/InteractScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import MenuScreen from './src/screens/MenuScreen';


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

Navigation.registerComponent('navigation.storyTouch.InteractScreen', () => props => (
  <Provider store={store}>
    <InteractScreen {...props} />
  </Provider>
), () => InteractScreen);

Navigation.registerComponent('navigation.storyTouch.HistoryScreen', () => props => (
  <Provider store={store}>
    <HistoryScreen {...props} />
  </Provider>
), () => HistoryScreen);

Navigation.registerComponent('navigation.storyTouch.MenuScreen', () => props => (
  <Provider store={store}>
    <MenuScreen {...props} />
  </Provider>
), () => MenuScreen);

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
                  rightButtons: [
                    {
                      id: 'historyButton',
                      text: 'History',
                    },
                  ],
                },
              },
            },
          },
        ],
      },

    },
  });
});

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage, // for web: window.localStorage
  defaultExpires: null,
  enableCache: true,
});

global.storage = storage;
