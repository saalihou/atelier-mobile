import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
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
    const [x, y, w] = [props.x, props.y, props.w].map(prcnt);
    const { rotate, containerLayout: layout, value, onChange } = this.props;
    const width = (w || SPOT_SIZE) * layout.width;
    const height = 30;
    const left = x * layout.width - width / 2 + layout.x;
    const top = y * layout.height - height;
    const rotateValue = rotate ? parseFloat(rotate.replace('deg', '')) : 0;
    const inputRotate = rotateValue > 45 || rotateValue < -45 ? -rotateValue : 0;
    return (
      <View
        style={[
          styles.container,
          { left, top, width, height, transform: [{ rotateZ: `${rotateValue}deg` }] },
        ]}
      >
        <TouchableOpacity
          onPressIn={() => this.input.focus()}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 10,
          }}
        />
        <TextInput
          keyboardType="numeric"
          style={[styles.input, { transform: [{ rotateZ: `${inputRotate}deg` }] }]}
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          value={String(value)}
          onChangeText={newValue => onChange(parseInt(newValue, 10))}
          ref={(ref) => {
            this.input = ref;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderBottomColor: colors.ACCENT,
    borderBottomWidth: 3,
    opacity: 0.8,
  },
  input: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    padding: 0,
    margin: 0,
    paddingBottom: 0,
    marginBottom: 0,
    flex: 1,
    color: colors.ACCENT,
    textAlignVertical: 'bottom',
    lineHeight: 15,
  },
});

export default Spot;
