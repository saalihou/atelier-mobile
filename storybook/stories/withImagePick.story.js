// @flow
import * as React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ImagePicker from '../../js/components/ImagePicker';
import withImagePick from '../../js/hoc/withImagePick';

const ImagePickerContainer = withImagePick()(ImagePicker);

storiesOf('withImagePick', module)
  .addDecorator(getStory => (
    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>{getStory()}</View>
  ))
  .add('with basic props', () => <ImagePickerContainer onPick={action('onPick')} />);
