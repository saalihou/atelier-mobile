// @flow
import React, { Component } from 'react';
// $FlowFixMe
import { TextInput, View, StyleSheet, TextInputProperties } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../theme/colors.json';

export type InputProps = {
  icon?: string,
} & TextInputProperties;

class Input extends Component {
  props: InputProps;
  render() {
    const { icon, style, ...props } = this.props;
    return (
      <View style={styles.container}>
        {icon && <Icon name={icon} color={colors.ACCENT} size={40} style={styles.icon} />}
        <TextInput
          underlineColorAndroid={colors.ACCENT}
          selectionColor={colors.ACCENT_FADED}
          placeholderTextColor={colors.ACCENT_FADED}
          style={[styles.input, icon && styles.inputWithIcon, style]}
          {...props}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
  },
  input: {
    flex: 1,
    color: colors.PRIMARY_FOREGROUND,
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputWithIcon: {
    paddingLeft: 50,
  },
  icon: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
});

export default Input;
