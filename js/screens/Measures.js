import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import screen from '../hoc/screen';

import InfoSign from '../components/InfoSign';

class Measures extends Component {
  render() {
    return (
      <View style={styles.container}>
        <InfoSign icon="add-circle-outline" message="Prendre mesures" onPress={() => undefined} />
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
