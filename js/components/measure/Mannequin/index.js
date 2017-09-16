// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image, LayoutChangeEvent } from 'react-native';
import { autobind } from 'core-decorators';

import defaultMeasurement from './measurements/default';
import Spot from './Spot';

export type Measurements = {
  [measurementName: string]: number,
};

type MannequinState = {
  containerLayout: LayoutChangeEvent,
  measurements: Measurements,
};

export type MannequinProps = {
  initialMesurements?: Measurements,
  onChange?: (measurements: Object) => undefined,
};

@autobind
class Mannequin extends Component {
  props: MannequinProps;

  static defaultProps = {
    initialMesurements: {},
    onChange: () => undefined,
  };

  state: MannequinState = {
    containerLayout: {
      width: 0,
      height: 0,
    },
    measurements: {},
  };

  constructor(props: MannequinProps) {
    super(props);
    this.state.measurements = props.initialMesurements;
  }

  onSpotValueChange(name: string, value: number) {
    this.setState(
      {
        measurements: {
          ...this.state.measurements,
          [name]: value,
        },
      },
      () => this.props.onChange(this.state.measurements),
    );
  }

  onLayout(e: LayoutChangeEvent, measurement) {
    const { width: containerWidth, height: containerHeight } = e.nativeEvent.layout;
    const imageRatio = measurement.imageWidth / measurement.imageHeight;
    const imageWidth = containerHeight * imageRatio;
    const imageHeight = containerHeight;

    this.setState({
      containerLayout: {
        width: imageWidth,
        height: imageHeight,
        x: (containerWidth - imageWidth) / 2,
        y: 0,
      },
    });
  }

  render() {
    const { containerLayout, measurements } = this.state;
    return (
      <View style={styles.container} onLayout={e => this.onLayout(e, defaultMeasurement)}>
        <Image style={{ flex: 1 }} source={defaultMeasurement.image} resizeMode="center" />
        {defaultMeasurement.spots.map(spot => (
          <Spot
            key={spot.name}
            {...spot}
            containerLayout={containerLayout}
            value={measurements[spot.name] || ''}
            onChange={value => this.onSpotValueChange(spot.name, value)}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Mannequin;
