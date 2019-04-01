import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Image, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { uploadImage, getStory } from '../../store/actions/story';
import DefaultButton from '../../components/DefaultButton';
import styles from './styles';
import { STORY_CAPTIONING } from '../../store/loadingTypes';

class Preview extends Component {
  state = {
    width: 0,
    height: 0,
  }
  componentDidMount() {
    const { width: screenWidth } = Dimensions.get('screen');
    Image.getSize(this.props.previewUri, (w, h) => {
      this.setState({ width: screenWidth, height: (screenWidth * h) / w });
    });
  }
  handleImagePress = (evt) => {
    const { width, height } = this.state;
    const { locationX: x, locationY: y } = evt.nativeEvent;
    this.props.onGetStory(x / width, y / height);
  }
  handleSubmitPress = async () => {
    const { onUploadImage, previewUri } = this.props;
    await onUploadImage(previewUri);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.storyTouch.InteractScreen',
        passProps: {
          previewUri: this.props.previewUri,
        },
        options: {
          topBar: {
            title: {
              text: 'Story',
            },
          },
        },
      },
    });
  }
  render() {
    const { isLoading } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{ width: this.state.width, height: this.state.height }}
            resizeMode="contain"
            source={{ uri: this.props.previewUri }}
          />
          <DefaultButton loading={isLoading} onPress={this.handleSubmitPress}>Upload</DefaultButton>
        </View>
      </View>
    );
  }
}

Preview.propTypes = {
  previewUri: PropTypes.string.isRequired,
  onUploadImage: PropTypes.func.isRequired,
  onGetStory: PropTypes.func.isRequired,
  componentId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    caption: state.story.caption,
    isLoading: Boolean(state.ui.isLoading[STORY_CAPTIONING]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadImage: image => dispatch(uploadImage(image)),
    onGetStory: (x, y) => dispatch(getStory(x, y)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
