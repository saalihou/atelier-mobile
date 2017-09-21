// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export type WithImagePickProps = {
  onPick: (pickedImages: Array<string>) => void,
};

type WithImagePickState = {
  pickedImages: Array<string>,
};

type MediaOrigin = 'camera' | 'library';

type ImagePickerProps = {
  onPickRequest: (o: MediaOrigin) => any,
  pickedImages: Array<string>,
};

export default function withImagePick(): (
  ComponentType<ImagePickerProps>,
) => ComponentType<WithImagePickProps> {
  return (Picker) => {
    class Wrapper extends Component<WithImagePickProps, WithImagePickState> {
      state = {
        pickedImages: [],
      };

      async pick(origin: MediaOrigin): Promise<void> {
        try {
          const pickMethod = origin === 'library' ? 'openPicker' : 'openCamera';
          const images = await ImagePicker[pickMethod]({
            multiple: true,
            compressImageMaxWidth: 1200,
            compressImageMaxHeight: 1200,
            compressImageQuality: 1,
            mediaType: 'photo',
          });
          const pickedImages = this.state.pickedImages.concat(images.map(i => i.path));
          this.setState({
            pickedImages,
          });
          this.props.onPick(pickedImages);
        } catch (e) {
          console.warn(e);
        }
      }

      render() {
        const { pickedImages } = this.state;
        return <Picker pickedImages={pickedImages} onPickRequest={origin => this.pick(origin)} />;
      }
    }

    Wrapper.displayName = `withContactSearch(${Picker.displayName || ''})`;

    return Wrapper;
  };
}
