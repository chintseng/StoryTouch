import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { View, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
// import styles from './styles';
import { getHistory } from '../../store/actions/story';

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
  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'closeButton') {
      Navigation.dismissModal(this.props.componentId);
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHistory: () => dispatch(getHistory()),
  };
};

export default compose(connect(null, mapDispatchToProps))(HistoryScreen);
