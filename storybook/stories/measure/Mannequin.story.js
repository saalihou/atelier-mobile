import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';

import Mannequin from '../../../js/components/measure/Mannequin';

storiesOf('Mannequin', module)
  .addDecorator(withKnobs)
  .add('with onChange', () => <Mannequin onChange={action('onChange')} />)
  .add('with initialMeasurements and onChange', () => (
    <Mannequin initialMesurements={{ neck: 30, waist: 123 }} onChange={action('onChange')} />
  ))
  .add('with different container height', () => (
    <View style={{ height: number('view height', 400) }}>
      <Mannequin onChange={action('onChange')} />
    </View>
  ));
