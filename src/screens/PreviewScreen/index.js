import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { uploadImage, getStory } from '../../store/actions/story';
import DefaultButton from '../../components/DefaultButton';

class Preview extends Component {
  state = {
    width: 0,
    height: 0,
  }
  componentDidMount() {
    const { width: screenWidth } = Dimensions.get('screen');
    // console.log(Dimensions.get('screen'));
    Image.getSize(this.props.previewUri, (w, h) => {
      this.setState({ width: screenWidth, height: (screenWidth * h) / w });
    });
  }
  handleImagePress = (evt) => {
    const { width, height } = this.state;
    const { locationX: x, locationY: y } = evt.nativeEvent;
    this.props.onGetStory(x / width, y / height);
  }
  handleSubmitPress = () => {
    const { onUploadImage, previewUri } = this.props;
    onUploadImage(previewUri);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'navigation.storyTouch.PreviewScreen',
        passProps: {
          previewUri: this.props.previewUri,
          submitted: true,
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
    const { caption, submitted } = this.props;
    const content = submitted ? (
      <View>
        <TouchableOpacity onPress={this.handleImagePress}>
          <Image
            style={{ width: this.state.width, height: this.state.height }}
            resizeMode="contain"
            source={{ uri: this.props.previewUri }}
          />
        </TouchableOpacity>
        <Text>{caption}</Text>
      </View>
    ) : (
      <View>
        <Image
          style={{ width: this.state.width, height: this.state.height }}
          resizeMode="contain"
          source={{ uri: this.props.previewUri }}
        />
        <DefaultButton onPress={this.handleSubmitPress}>Upload</DefaultButton>
      </View>
    );
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

Preview.defaultProps = {
  submitted: false,
};

Preview.propTypes = {
  previewUri: PropTypes.string.isRequired,
  onUploadImage: PropTypes.func.isRequired,
  onGetStory: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired,
  submitted: PropTypes.bool,
  componentId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    caption: state.story.caption,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUploadImage: uri => dispatch(uploadImage(uri)),
    onGetStory: (x, y) => dispatch(getStory(x, y)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
