// @flow
import * as React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ImagePicker from '../../js/components/ImagePicker';

storiesOf('ImagePicker', module)
  .addDecorator(getStory => (
    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>{getStory()}</View>
  ))
  .add('without picked image', () => <ImagePicker onPickRequest={action('onPickRequest')} />)
  .add('with picked image', () => (
    <ImagePicker
      pickedImages={[
        'http://placehold.it/500x900',
        'http://placehold.it/300x600',
        'http://placehold.it/1200x600',
        'http://placehold.it/400x400',
      ]}
      onPickRequest={action('onPickRequest')}
    />
  ));
