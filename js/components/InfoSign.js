import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../theme/colors.json';

export type InfoSignProps = {
  message: string,
  icon: string,
  onPress: () => undefined,
};

class InfoSign extends Component {
  props: InfoSignProps;

  /** @private */
  render() {
    const { icon, message, onPress, ...props } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} disabled={!onPress} {...props}>
          <View style={styles.touchableArea}>
            <Icon color={colors.ACCENT} name={icon} size={50} />
            <Text style={styles.message}>{message}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  touchableArea: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default InfoSign;
