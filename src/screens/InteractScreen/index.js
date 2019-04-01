import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground, Animated, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import styles from './styles';
import { getStory } from '../../store/actions/story';
import Circle from '../../components/Circle';
import { STORY_CAPTIONING } from '../../store/loadingTypes';
import Rectangle from '../../components/Rectangle';
import NewCircle from '../../components/NewCircle';
import Canvas from '../../components/Canvas';

class InteractScreen extends React.PureComponent {
  static options() {
    return {
      topBar: {
        leftButtons: [
          {
            id: 'menuButton',
            text: 'Menu',
          },
        ],
        rightButtons: [
          {
            id: 'historyButton',
            text: 'History',
          },
        ],
      },
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      drawing: false,
      isDrawing: false,
      x: 0,
      y: 0,
    };
    Navigation.events().bindComponent(this);
  }
  componentDidMount() {
    const { width: screenWidth } = Dimensions.get('screen');
    Image.getSize(this.props.previewUri, (w, h) => {
      this.setState({ width: screenWidth, height: (screenWidth * h) / w });
    });
  }
  componentDidUpdate(prevProps) {
    const { selectionType } = this.props;
    if (prevProps.selectionType !== selectionType) {
      if (selectionType === 'Exit') {
        Navigation.popToRoot(this.props.componentId);
      }
    }
  }
  handleImagePress = (evt) => {
    const { width, height } = this.state;
    const { locationX: x, locationY: y } = evt.nativeEvent;
    this.props.onGetShortClickStory(x, y, width, height);
  }
  handleCirclePressIn = (event) => {
    const { locationX: x, locationY: y } = event.nativeEvent;
    this.setState({ x, y, drawing: true });
  }
  handleCirclePressOut = () => {
    this.setState({ drawing: false });
  }
  handleCircleFinished = (radius) => {
    const {
      x, y, width, height,
    } = this.state;
    this.props.onGetLongClickStory(x, y, width, height, radius);
  }
  handleRecPress = (event) => {
    const { locationX: x, locationY: y } = event.nativeEvent;
    this.setState({ x, y, drawing: true });
  }
  handleRecFinished = async (recWidth, recHeight) => {
    const {
      x, y, width, height,
    } = this.state;
    await this.props.onGetRecStory(x, y, width, height, {
      left: x,
      right: x + recWidth,
      top: y,
      bottom: y + recHeight,
    });
    this.setState({ drawing: false });
  }
  handleDrawFinished = async (rec) => {
    console.log(rec);
    const { width, height } = this.state;
    await this.props.onGetRecStory(rec.left, rec.top, width, height, rec);
  }
  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'menuButton') {
      Navigation.showModal({
        stack: {
          children: [{
            component: {
              name: 'navigation.storyTouch.MenuScreen',
              options: {
                topBar: {
                  title: {
                    text: 'Menu',
                  },
                },
              },
            },
          }],
        },
      });
    } else if (buttonId === 'historyButton') {
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
    const {
      x, y, radius, pressing, drawing,
    } = this.state;
    const {
      caption, previewUri, isLoading, selectionType,
    } = this.props;
    let content;
    if (selectionType === 'Short Click') {
      content = (
        <TouchableWithoutFeedback
          disabled={isLoading}
          onPress={this.handleImagePress}
        >
          <ImageBackground
            style={{ width: this.state.width, height: this.state.height }}
            source={{ url: previewUri }}
          >
            {pressing && <Circle top={y - radius} left={x - radius} radius={radius} />}
          </ImageBackground>
        </TouchableWithoutFeedback>
      );
    } else if (selectionType === 'Long Click') {
      content = (
        <TouchableWithoutFeedback
          disabled={isLoading}
          onPressIn={this.handleCirclePressIn}
          onPressOut={this.handleCirclePressOut}
        >
          <ImageBackground
            style={{ width: this.state.width, height: this.state.height }}
            source={{ url: previewUri }}
          >
            {drawing && <NewCircle top={y} left={x} onFinished={this.handleCircleFinished} />}
          </ImageBackground>
        </TouchableWithoutFeedback>
      );
    } else if (selectionType === 'Frame') {
      content = (
        <TouchableWithoutFeedback
          disabled={isLoading}
          onPressIn={this.handleRecPress}
        >
          <ImageBackground
            style={{ width: this.state.width, height: this.state.height }}
            source={{ url: previewUri }}
          >
            {this.state.drawing &&
              <Rectangle
                left={x}
                top={y}
                onRecFinished={this.handleRecFinished}
                disabled={isLoading}
              />}
          </ImageBackground>
        </TouchableWithoutFeedback>
      );
    } else if (selectionType === 'Draw') {
      content = (
        <ImageBackground
          style={{ width: this.state.width, height: this.state.height }}
          source={{ url: previewUri }}
        >
          <Canvas isLoading={isLoading} onDrawFinished={this.handleDrawFinished} />
        </ImageBackground>
      );
    }
    const textContent = isLoading ? (
      <ActivityIndicator />
    ) : (
      <Text style={styles.text}>{caption}</Text>
    );
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {content}
          <View style={styles.textView}>
            {textContent}
          </View>
        </View>
      </View>
    );
  }
}

InteractScreen.propTypes = {
  previewUri: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  onGetShortClickStory: PropTypes.func.isRequired,
  onGetLongClickStory: PropTypes.func.isRequired,
  onGetRecStory: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  componentId: PropTypes.string.isRequired,
  selectionType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    caption: state.story.caption,
    isLoading: Boolean(state.ui.isLoading[STORY_CAPTIONING]),
    selectionType: state.story.selectionType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetShortClickStory: (x, y, width, height) =>
      dispatch(getStory(x, y, width, height)),
    onGetLongClickStory: (x, y, width, height, radius) =>
      dispatch(getStory(x, y, width, height, radius)),
    onGetRecStory: (x, y, width, height, rec) =>
      dispatch(getStory(x, y, width, height, rec)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InteractScreen);
