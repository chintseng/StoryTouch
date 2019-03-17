import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class Preview extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 400, height: 400}}
          source={{uri: this.props.previewUri}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
