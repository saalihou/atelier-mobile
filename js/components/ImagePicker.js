import React, { Component } from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../theme/colors.json';

export type ImagePickerProps = {
  pickedImage: string,
  onPickRequest: () => void,
};

class ImagePicker extends Component<ImagePickerProps> {
  render() {
    const { onPickRequest, pickedImage } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPickRequest}>
        {pickedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: pickedImage }} resizeMode="cover" style={styles.image} />
          </View>
        )}
        {!pickedImage && (
          <Icon name="add-a-photo" size={50} color={colors.ACCENT} style={styles.icon} />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 150,
    height: 150,
  },
  image: {
    flex: 1,
  },
  icon: {},
  pickedImageIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default ImagePicker;
