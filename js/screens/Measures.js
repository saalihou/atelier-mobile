import React, { Component } from 'react';
import { Text, View } from 'react-native';

import screen from '../hoc/screen';

class Measures extends Component {
  render() {
    return (
      <View>
        <Text> Measures </Text>
      </View>
    );
  }
}

export default screen(Measures);
