// @flow
import * as React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';

import ContactList from '../../../js/components/clients/ContactList';
import withContactSearch from '../../../js/hoc/clients/withContactSearch';

const ContactSearchList = withContactSearch(c => ({
  id: c.recordID,
  name: [c.givenName, c.middleName, c.familyName].filter(v => v && v.length > 0).join(' '),
  phone: c.phoneNumbers[0].number,
}))(ContactList);

storiesOf('withContactSearch', module)
  .addDecorator(withKnobs)
  .add('type a term to search for (in browser)', () => (
    <ContactSearchList term={text('term')} onSelect={c => alert(JSON.stringify(c, null, 2))} />
  ));
