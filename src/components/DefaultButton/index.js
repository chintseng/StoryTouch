import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'react-native-elements';

const DefaultButton = ({ children, onPress, icon }) => {
  return (
    <Button
      icon={
        icon ? <Icon
          name={icon}
          size={15}
          color="white"
          containerStyle={{
            marginRight: 10,
          }}
          type="font-awesome"
        /> : null
      }
      title={children}
      onPress={onPress}
    />
  );
};

DefaultButton.defaultProps = {
  children: '',
  onPress: null,
  icon: null,
};

DefaultButton.propTypes = {
  children: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.string,
};

export default DefaultButton;
