import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import InfoSign from '../../js/components/InfoSign';

storiesOf('InfoSign', module)
  .add('with icon and message', () => (
    <InfoSign icon="info-outline" message="This is very important" />
  ))
  .add('with onPress', () => (
    <InfoSign icon="warning" message="Click here to do something" onPress={action('onPress')} />
  ));
