import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import Measures from './screens/Measures';
import TakeMeasures from './screens/TakeMeasures';

import store from './store';

const NavigatorApp = StackNavigator({
  Measures: { screen: Measures },
  TakeMeasures: { screen: TakeMeasures },
});

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigatorApp />
      </Provider>
    );
  }
}

export default Root;
