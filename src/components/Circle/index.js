import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { View } from 'react-native';
import styles from './styles';

class Circle extends React.PureComponent {
  render() {
    const { radius, top, left } = this.props;
    const style = {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      top,
      left,
    };
    return (
      <View style={{ ...styles.container, ...style }} />
    );
  }
}

Circle.defaultProps = {
  top: 50,
  left: 50,
  radius: 40,
};

Circle.propTypes = {
  radius: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
};

export default compose()(Circle);
