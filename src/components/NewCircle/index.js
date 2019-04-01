import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Animated } from 'react-native';
import styles from './styles';

class Circle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      radius: new Animated.Value(30),
      radiusValue: 30,
    };
    this.state.radius.addListener(({ value }) => this.setState({ radiusValue: value }));
    Animated.timing(this.state.radius, {
      toValue: 300,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }
  componentWillUnmount() {
    this.props.onFinished(this.state.radiusValue);
  }
  render() {
    const { left, top } = this.props;
    const { radius } = this.state;
    const style = {
      left: Animated.subtract(left, radius),
      top: Animated.subtract(top, radius),
      width: Animated.multiply(2, radius),
      height: Animated.multiply(2, radius),
      borderRadius: radius,
    };
    return (
      <Animated.View style={[styles.container, style]} />
    );
  }
}

Circle.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  onFinished: PropTypes.func.isRequired,
};

export default compose()(Circle);
