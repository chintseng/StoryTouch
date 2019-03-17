/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import App from "./App";
import STCamera from "./STCamera";

Navigation.registerComponent(`navigation.storyTouch.WelcomeScreen`, () => App);
Navigation.registerComponent(`navigation.storyTouch.CameraScreen`, () => STCamera);

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
