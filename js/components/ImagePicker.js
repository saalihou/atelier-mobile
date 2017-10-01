import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../theme/colors.json';

type MediaOrigin = 'camera' | 'library';

export type ImagePickerProps = {
  pickedImages: Array<string>,
  onPickRequest: (o: MediaOrigin) => any,
};

class ImagePicker extends Component<ImagePickerProps> {
  static defaultProps = {
    pickedImages: [],
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.pickedImages.length !== this.props.pickedImages.length) {
      setTimeout(() => {
        this.imagesContainer.scrollToEnd();
      });
    }
  };

  render() {
    const { onPickRequest, pickedImages } = this.props;
    return (
      <View style={styles.container} onPress={onPickRequest}>
        <ScrollView
          horizontal
          ref={(ref) => {
            this.imagesContainer = ref;
          }}
        >
          {pickedImages.map(imageUri => (
            <View style={styles.imageContainer} key={imageUri}>
              <Image source={{ uri: imageUri }} resizeMode="cover" style={styles.image} />
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => onPickRequest('camera')}>
            <Icon name="add-a-photo" size={50} color={colors.ACCENT} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPickRequest('library')}>
            <Icon name="photo-library" size={50} color={colors.ACCENT} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    width: 150,
    height: 150,
    borderRightColor: colors.PRIMARY,
    borderRightWidth: 2,
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ImagePicker;
