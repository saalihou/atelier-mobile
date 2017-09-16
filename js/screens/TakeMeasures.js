import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationStackScreenOptions } from 'react-navigation';

import screen from '../hoc/screen';

class TakeMeasures extends Component {
  static navigationOptions: NavigationStackScreenOptions = {
    headerTitle: 'Prendre mesures',
  };

  render() {
    return (
      <View>
        <Text> TakeMeasures </Text>
      </View>
    );
  }
}

export default screen(TakeMeasures);
