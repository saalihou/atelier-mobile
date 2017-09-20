// @flow
import * as React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ImagePicker from '../../js/components/ImagePicker';

storiesOf('ImagePicker', module)
  .addDecorator(getStory => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>{getStory()}</View>
  ))
  .add('without picked image', () => <ImagePicker onPickRequest={action('onPickRequest')} />)
  .add('with picked image', () => (
    <ImagePicker
      pickedImage="http://placehold.it/500x900"
      onPickRequest={action('onPickRequest')}
    />
  ));
