import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
// import { View, Text } from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
// import styles from './styles';

class Canvas extends React.PureComponent {
  state = {
    left: 1000,
    right: 0,
    top: 1000,
    bottom: 0,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.sketchCanvas.clear();
    }
  }
  handleStrokeChanged = (x, y) => {
    if (x > this.state.right) {
      this.setState({ right: x });
    } else if (x < this.state.left) {
      this.setState({ left: x });
    }
    if (y > this.state.bottom) {
      this.setState({ bottom: y });
    } else if (y < this.state.top) {
      this.setState({ top: y });
    }
  }
  handleStrokeEnd = () => {
    this.props.onDrawFinished(this.state);
  }
  render() {
    return (
      <SketchCanvas
        ref={(ref) => {
          this.sketchCanvas = ref;
        }}
        style={{ flex: 1 }}
        strokeColor="red"
        strokeWidth={4}
        onStrokeChanged={this.handleStrokeChanged}
        onStrokeEnd={this.handleStrokeEnd}
        touchEnabled={!this.props.isLoading}
      />
    );
  }
}

Canvas.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onDrawFinished: PropTypes.func.isRequired,
};

export default compose()(Canvas);
