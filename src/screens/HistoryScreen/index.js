import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { View, FlatList, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
// import styles from './styles';
import { getHistory, clearHistory } from '../../store/actions/story';

class HistoryScreen extends React.PureComponent {
  static options() {
    return {
      topBar: {
        leftButtons: [
          {
            id: 'closeButton',
            text: 'Close',
          },
        ],
        rightButtons: [
          {
            id: 'clearButton',
            text: 'Clear',
          },
        ],
      },
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
    this.initialHistory();
    Navigation.events().bindComponent(this);
  }
  initialHistory = async () => {
    const history = await this.props.onGetHistory();
    console.log(history);
    this.setState({ history });
  }
  navigationButtonPressed = async ({ buttonId }) => {
    if (buttonId === 'closeButton') {
      Navigation.dismissModal(this.props.componentId);
    } else if (buttonId === 'clearButton') {
      Alert.alert(
        'Are you sure?',
        'You can not redo this action',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              await this.props.onClearHistory();
              this.setState({ history: [] });
            },
          },
        ],
      );
    }
  }
  render() {
    const { history } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <ListItem
              containerStyle={{ paddingVertical: 8 }}
              title={item.caption}
              leftAvatar={{ source: { uri: item.url } }}
              key={item.url}
              bottomDivider
              onPress={this.handleExpenseClick}
            />
          )}
        />
      </View>
    );
  }
}

HistoryScreen.propTypes = {
  onGetHistory: PropTypes.func.isRequired,
  componentId: PropTypes.string.isRequired,
  onClearHistory: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHistory: () => dispatch(getHistory()),
    onClearHistory: () => dispatch(clearHistory()),
  };
};

export default compose(connect(null, mapDispatchToProps))(HistoryScreen);
