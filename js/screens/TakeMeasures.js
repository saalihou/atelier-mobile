import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationStackScreenOptions } from 'react-navigation';

import screen from '../hoc/screen';
import Mannequin from '../components/measure/Mannequin';

class TakeMeasures extends Component {
  static navigationOptions: NavigationStackScreenOptions = {
    headerTitle: 'Prendre mesures',
  };

  render() {
    return (
      <View style={styles.container}>
        <Mannequin />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default screen(TakeMeasures);
