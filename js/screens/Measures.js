import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationScreenProp, NavigationStackScreenOptions } from 'react-navigation';
import { autobind } from 'core-decorators';

import screen from '../hoc/screen';
import InfoSign from '../components/InfoSign';

export type MeasuresProp = {
  navigation: NavigationScreenProp<{}, {}>,
};

@autobind
class Measures extends Component {
  static navigationOptions: NavigationStackScreenOptions = {
    headerLeft: <View />, // workaround to center title on root view
  };
  props: MeasuresProp;

  takeMeasures() {
    const { navigation } = this.props;
    navigation.navigate('TakeMeasures');
  }

  /** @private */
  render() {
    return (
      <View style={styles.container}>
        <InfoSign icon="add-circle-outline" message="Prendre mesures" onPress={this.takeMeasures} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default screen(Measures);
