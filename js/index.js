import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Measures from './screens/Measures';

const NavigatorApp = StackNavigator({
  Measures: { screen: Measures },
});

class Root extends Component {
  render() {
    return <NavigatorApp />;
  }
}

export default Root;
