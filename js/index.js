import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Measures from './screens/Measures';
import TakeMeasures from './screens/TakeMeasures';

const NavigatorApp = StackNavigator({
  Measures: { screen: Measures },
  TakeMeasures: { screen: TakeMeasures },
});

class Root extends Component {
  render() {
    return <NavigatorApp />;
  }
}

export default Root;
