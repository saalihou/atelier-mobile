// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Chance from 'chance';
import Promise from 'bluebird';
import fs from 'react-native-fs';
import path from 'path';

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

const chance = new Chance();

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
          const movedImages = await Promise.map(images, async (image) => {
            const hash = chance.hash();
            const srcPath = image.path.replace('file://', '');
            const destDir = `${fs.MainBundlePath || fs.DocumentDirectoryPath}/Images`;
            await fs.mkdir(destDir);
            const destPath = `${destDir}/${hash}${path.extname(srcPath)}`;
            await fs.copyFile(srcPath, destPath);
            return { ...image, path: `file://${destPath}` };
          });
          const pickedImages = this.state.pickedImages.concat(movedImages.map(i => i.path));
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
