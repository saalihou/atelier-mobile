import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Mannequin from '../../../js/components/measure/Mannequin';

storiesOf('Mannequin', module)
  .add('with onChange', () => <Mannequin onChange={action('onChange')} />)
  .add('with initialMeasurements and onChange', () => (
    <Mannequin initialMesurements={{ neck: 30, waist: 123 }} onChange={action('onChange')} />
  ));
