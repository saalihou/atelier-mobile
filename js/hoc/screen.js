import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationStackScreenOptions } from 'react-navigation';
import merge from 'lodash/merge';
import isFunction from 'lodash/isFunction';

import colors from '../theme/colors.json';

export type ScreenType = React.ComponentType<> & {
  navigationOptions: NavigationStackScreenOptions,
};

export default function screen(WrappedComponent: React.ComponentType<>): ScreenType {
  class Screen extends Component {
    render() {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={colors.PRIMARY_FOREGROUND} barStyle="light-content" />
          <WrappedComponent {...this.props} />
        </View>
      );
    }
  }

  Screen.displayName = `screen(${WrappedComponent.displayName})`;
  Screen.propTypes = WrappedComponent.propTypes;
  Screen.defaultProps = WrappedComponent.defaultProps;

  Screen.navigationOptions = (params): NavigationStackScreenOptions => {
    const defaultOptions: NavigationStackScreenOptions = {
      headerTitle: 'Atelier',
      headerStyle: {
        backgroundColor: colors.PRIMARY,
      },
      headerTintColor: colors.PRIMARY_FOREGROUND,
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
      },
      headerLeft: <View />,
      headerRight: <View />, // we do this to make sure title is centered no matter what, see https://github.com/react-community/react-navigation/issues/544#issuecomment-298618209
    };

    return merge(
      {},
      defaultOptions,
      isFunction(WrappedComponent.navigationOptions)
        ? WrappedComponent.navigationOptions(params)
        : WrappedComponent.navigationOptions,
    );
  };

  return Screen;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    flex: 1,
  },
});
