import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ContactList from '../../../js/components/clients/ContactList';

storiesOf('ContactList', module).add('with basic props', () => (
  <View style={{ padding: 10 }}>
    <ContactList
      data={[
        {
          id: 1,
          name: 'Saalihou Ndiaye',
          phone: '772456556',
        },
        {
          id: 2,
          name: 'Fodé Ndiaye',
          phone: '774294049',
        },
        {
          id: 3,
          name: 'Ngoné Niang',
          phone: '773700649',
        },
        {
          id: 4,
          name: 'Fatou Kiné Ndiaye',
          phone: '775108144',
        },
      ]}
    />
  </View>
));
