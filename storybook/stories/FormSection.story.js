// @flow
import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import FormSection from '../../js/components/FormSection';
import Input from '../../js/components/Input';

storiesOf('FormSection', module)
  .add('with some inputs', () => (
    <FormSection
      submitLabel="Subscribe"
      onChange={action('onChange')}
      onSubmit={action('onSubmit')}
    >
      <Input name="phone" icon="phone" keyboardType="numeric" />
      <Input name="name" icon="people" autoCapitalize="words" />
      <Input name="password" icon="lock" secureTextEntry />
    </FormSection>
  ))
  .add('with default values', () => (
    <FormSection
      submitLabel="Subscribe"
      onChange={action('onChange')}
      onSubmit={action('onSubmit')}
    >
      <Input name="phone" icon="phone" keyboardType="numeric" defaultValue="772456556" />
      <Input name="name" icon="people" autoCapitalize="words" defaultValue="Saalihou" />
      <Input name="password" icon="lock" secureTextEntry defaultValue="passer" />
    </FormSection>
  ));
