// @flow
import React, { Component } from 'react';
// $FlowFixMe
import { TextInput, Text, View, StyleSheet, TextInputProperties } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../theme/colors.json';

export type InputProps = {
  icon?: string,
  name?: string,
  error?: string,
} & TextInputProperties;

class Input extends Component<InputProps> {
  render() {
    const { icon, style, name, error, ...props } = this.props;
    return (
      <View style={[styles.container, !props.multiline && { height: 60 }]}>
        {icon && <Icon name={icon} color={colors.ACCENT} size={40} style={styles.icon} />}
        {error && <Text style={styles.errorMessage}>{error}</Text>}
        <TextInput
          underlineColorAndroid={colors.ACCENT}
          selectionColor={colors.ACCENT_FADED}
          placeholderTextColor={colors.ACCENT_FADED}
          style={[
            styles.input,
            icon && styles.inputWithIcon,
            !props.multiline && { flex: 1 },
            style,
          ]}
          {...props}
        />
        {error && <Icon name="warning" color={colors.DANGER} size={30} style={styles.errorIcon} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  input: {
    color: colors.PRIMARY_FOREGROUND,
    fontSize: 18,
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
  errorIcon: {
    position: 'absolute',
    right: 5,
    top: 10,
  },
  errorMessage: {
    position: 'absolute',
    left: 50,
    color: colors.DANGER,
  },
});

export default Input;
