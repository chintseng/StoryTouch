import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import { Navigation } from 'react-native-navigation';
import styles from './styles';

export default class CameraScreen extends Component {
  onOpenPreviewScreen = (uri) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.storyTouch.PreviewScreen',
        passProps: {
          previewUri: uri,
        },
        options: {
          topBar: {
            title: {
              text: 'Preview',
            },
          },
        },
      },
    });
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.onOpenPreviewScreen(data.uri);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

CameraScreen.propTypes = {
  componentId: PropTypes.string.isRequired,
};

