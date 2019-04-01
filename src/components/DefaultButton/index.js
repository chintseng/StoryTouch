import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'react-native-elements';

const DefaultButton = ({
  children, onPress, icon, loading,
}) => {
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
      loading={loading}
      title={children}
      onPress={onPress}
      disabled={loading}
    />
  );
};

DefaultButton.defaultProps = {
  children: '',
  onPress: null,
  icon: null,
  loading: false,
};

DefaultButton.propTypes = {
  children: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.string,
  loading: PropTypes.bool,
};

export default DefaultButton;
