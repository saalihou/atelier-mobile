// @flow
import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Button from '../../js/components/Button';

storiesOf('Button', module)
  .addDecorator(getStory => (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>{getStory()}</View>
  ))
  .add('with basic props', () => <Button label="Press me" />)
  .add('with onPress', () => <Button label="Press me" onPress={action('onPress')} />);
