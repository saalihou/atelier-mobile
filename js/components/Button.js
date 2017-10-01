// @flow
import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import Ripple from 'react-native-material-ripple';

import colors from '../theme/colors.json';

export type ButtonProps = {
  label: string,
  disabled?: boolean,
  onPressIn?: () => void,
  onPressOut?: () => void,
  onPress?: () => void,
  onLongPress?: () => void,
};

class Button extends Component<ButtonProps> {
  static defaultProps = {
    disabled: false,
    onPressIn: () => undefined,
    onPressOut: () => undefined,
    onPress: () => undefined,
    onLongPress: () => undefined,
  };

  render() {
    const { label, disabled, ...props } = this.props;
    return (
      <Ripple
        style={[styles.container, disabled && { backgroundColor: colors.INACTIVE }]}
        rippleColor={colors.PRIMARY}
        rippleOpacity={0.5}
        rippleDuration={500}
        disabled={disabled}
        {...props}
      >
        <Text style={styles.text}>{label}</Text>
      </Ripple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: colors.ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 3,
  },
  text: {
    color: colors.PRIMARY,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Button;
