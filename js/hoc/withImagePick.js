// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export type WithImagePickProps = {
  onPick: (path: string) => void,
};

type WithImagePickState = {
  pickedImage?: string,
};

type ImagePickerProps = {
  onPickRequest: () => void,
  pickedImage?: string,
};

export default function withImagePick(): (
  ComponentType<ImagePickerProps>,
) => ComponentType<WithImagePickProps> {
  return (Picker) => {
    class Wrapper extends Component<WithImagePickProps, WithImagePickState> {
      state = {
        pickedImage: undefined,
      };

      pick(): void {
        ImagePicker.launchImageLibrary(
          {
            mediaType: 'photo',
            maxWidth: 1200,
            maxHeight: 1200,
            quality: 1,
          },
          (response) => {
            if (response.didCancel) {
              return;
            }
            if (response.error) {
              Alert.alert('Erreur', response.error);
            }
            this.setState({
              pickedImage: response.uri,
            });
            this.props.onPick(response.uri);
          },
        );
      }

      render() {
        const { pickedImage } = this.state;
        return <Picker pickedImage={pickedImage} onPickRequest={() => this.pick()} />;
      }
    }

    Wrapper.displayName = `withContactSearch(${Picker.displayName || ''})`;

    return Wrapper;
  };
}
