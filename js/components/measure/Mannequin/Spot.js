import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { isString } from 'lodash';

import colors from '../../../theme/colors.json';

export type ContainerLayout = {
  width: number,
  height: number,
  x: number,
  height: number,
};

export type SpotProps = {
  x: number,
  y: number,
  w: number,
  h: number,
  rotate: string,
  key: string,
  label: string,
  value: number,
  onChange: (value: number) => undefined,
  containerLayout: ContainerLayout,
};

const SPOT_SIZE = 50;

const prcnt = (percentage) => {
  if (!isString(percentage)) {
    throw new Error('Percentage must be a string');
  }
  if (percentage.charAt(percentage.length - 1) !== '%') {
    throw new Error('Percentage must end with a % sign');
  }
  return parseFloat(percentage.substring(0, percentage.length - 1)) / 100;
};

class Spot extends Component {
  props: SpotProps;

  render() {
    const { props } = this;
    const [x, y, w, h] = [props.x, props.y, props.w, props.h].map(prcnt);
    const { rotate, containerLayout: layout, value, onChange } = this.props;
    const width = (w || SPOT_SIZE) * layout.width;
    const height = (h || w || SPOT_SIZE) * layout.width;
    const left = x * layout.width - width / 2 + layout.x;
    const top = y * layout.height - height / 2 + layout.y;
    const borderRadius = width / 2;
    return (
      <View
        style={[
          styles.container,
          { left, top, width, height, borderRadius, transform: [{ rotateZ: rotate || '0deg' }] },
        ]}
      >
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          value={String(value)}
          onChangeText={newValue => onChange(parseInt(newValue, 10))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.ACCENT,
    opacity: 0.8,
  },
  input: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    padding: 0,
    margin: 0,
    flex: 1,
    color: colors.PRIMARY,
  },
});

export default Spot;
