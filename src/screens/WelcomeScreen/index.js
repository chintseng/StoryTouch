import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import styles from './styles';
import DefaultButton from '../../components/DefaultButton';

export default class WelcomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
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
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: 'navigation.storyTouch.InteractScreen',
    //     passProps: {
    //       previewUri: 'https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_3119000/ff_3119748_full.jpg&w=900',
    //     },
    //     options: {
    //       topBar: {
    //         title: {
    //           text: 'Preview',
    //         },
    //       },
    //     },
    //   },
    // });
  }
  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'historyButton') {
      Navigation.showModal({
        stack: {
          children: [{
            component: {
              name: 'navigation.storyTouch.HistoryScreen',
              options: {
                topBar: {
                  title: {
                    text: 'History',
                  },
                },
              },
            },
          }],
        },
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to StoryTouch!</Text>
        <Text style={styles.instructions}>To get started, click button</Text>
        <DefaultButton icon="camera" onPress={this.onOpenCamera}>Camera</DefaultButton>
      </View>
    );
  }
}

WelcomeScreen.propTypes = {
  componentId: PropTypes.string.isRequired,
};

