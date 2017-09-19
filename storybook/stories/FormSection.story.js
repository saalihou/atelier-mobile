// @flow
import * as React from 'react';

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
  ))
  .add('with validators', () => (
    <FormSection
      submitLabel="Subscribe"
      onChange={action('onChange')}
      onSubmit={action('onSubmit')}
      validators={{
        phone: {
          presence: { message: '^Vous devez indiquer un numéro de téléphone' },
          format: {
            pattern: /(77|70|78|76)[\d]{7}/,
            message: '^Le format de votre numéro est invalide',
          },
        },
        name: {
          length: {
            minimum: 3,
            tooShort: '^Minimum 3 caractères',
          },
        },
        password: {
          length: {
            minimum: 6,
            tooShort: '^Minimum 6 caractères',
          },
        },
      }}
    >
      <Input name="phone" icon="phone" keyboardType="numeric" />
      <Input name="name" icon="people" autoCapitalize="words" />
      <Input name="password" icon="lock" secureTextEntry />
    </FormSection>
  ))
  .add('with nested values', () => (
    <FormSection
      submitLabel="Subscribe"
      onChange={action('onChange')}
      onSubmit={action('onSubmit')}
      validators={{ 'client.name': { presence: true } }}
    >
      <Input name="client.phone" icon="phone" keyboardType="numeric" defaultValue="77" />
      <Input name="client.name" icon="people" autoCapitalize="words" />
      <Input name="credentials.password" icon="lock" secureTextEntry />
    </FormSection>
  ));
