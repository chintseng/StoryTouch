import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Animated, PanResponder } from 'react-native';
import styles from './styles';

class Rectangle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY({ x: 100, y: 50 }),
    };
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (!this.props.disabled) {
          this.state.pan.setValue({
            x: gestureState.moveX - props.left,
            y: gestureState.moveY - props.top,
          });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (!this.props.disabled) {
          props.onRecFinished(gestureState.moveX - props.left, gestureState.moveY - props.top);
        }
      },
    });
  }
  render() {
    const { left, top } = this.props;
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          styles.container, {
            left, top, width: this.state.pan.x, height: this.state.pan.y,
          },
        ]}
      />
    );
  }
}

Rectangle.defaultProps = {
  left: 0,
  top: 0,
  disabled: false,
};

Rectangle.propTypes = {
  left: PropTypes.number,
  top: PropTypes.number,
  onRecFinished: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default compose()(Rectangle);
