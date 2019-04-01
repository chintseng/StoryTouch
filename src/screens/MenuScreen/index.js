import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
// import styles from './styles';
import { setSelectionType } from '../../store/actions/story';

const list = ['Short Click', 'Long Click', 'Frame', 'Draw', 'Exit'];

class MenuScreen extends React.PureComponent {
  handleListItemPress = key => () => {
    this.props.onSetSelectionType(key);
    Navigation.dismissModal(this.props.componentId);
  }
  render() {
    return (
      <View>
        <FlatList
          data={list}
          extraData={this.props.selectionType}
          renderItem={({ item }) => (
            <ListItem
              containerStyle={{ paddingVertical: 12 }}
              title={item}
              key={item}
              bottomDivider
              onPress={this.handleListItemPress(item)}
              chevron={(this.props.selectionType === item) && <Icon
                name="check"
                size={15}
                color="gray"
                type="font-awesome"
              />}
              // chevron
            />
          )}
        />
      </View>
    );
  }
}

MenuScreen.propTypes = {
  onSetSelectionType: PropTypes.func.isRequired,
  selectionType: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    selectionType: state.story.selectionType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSelectionType: type => dispatch(setSelectionType(type)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(MenuScreen);
