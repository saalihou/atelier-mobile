// @flow
import * as React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Input from '../../js/components/Input';

storiesOf('Input', module)
  .add('with basic props', () => <Input />)
  .add('with icon', () => <Input icon="local-shipping" />)
  .add('with icon and placeholder', () => (
    <Input icon="local-shipping" placeholder="Ouest Foire" />
  ));
