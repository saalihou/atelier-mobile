import React, { Component } from 'react';
import { Text, View, Image, TouchableNativeFeedback, StyleSheet } from 'react-native';

import { Measure as MeasureType } from '../../../actions/measure';
import colors from '../../../theme/colors.json';

export type Measure = MeasureType;

export type MeasureListItemProps = {
  item: Measure,
};

class MeasureListItem extends Component<MeasureListItemProps> {
  render() {
    const { item } = this.props;
    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(colors.TRANSPARENT_ACCENT)}>
        <View style={styles.container}>
          <View style={styles.infosContainer}>
            <Text style={styles.clientName}>{item.infos.client.name}</Text>
            <Text style={styles.notes} numberOfLines={1}>
              {item.infos.notes}
            </Text>
            <Text style={styles.clientPhone}>{item.infos.client.phone}</Text>
          </View>
          <View style={styles.thumbnailContainer}>
            <Image style={styles.thumbnail} source={{ uri: item.images[0] }} resizeMode="cover" />
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 85,
    elevation: 2,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.PRIMARY,
  },
  infosContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  thumbnailContainer: {
    backgroundColor: 'red',
    width: 75,
  },
  clientName: {
    fontSize: 20,
    color: colors.PRIMARY_FOREGROUND,
  },
  clientPhone: {
    fontSize: 12,
    color: colors.PRIMARY_FOREGROUND,
  },
  notes: {
    fontSize: 14,
  },
  thumbnail: {
    flex: 1,
  },
});

export default MeasureListItem;
