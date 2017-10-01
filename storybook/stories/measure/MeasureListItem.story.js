import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import MeasureListItem, { Measure } from '../../../js/components/measure/MeasureList/Item';
import colors from '../../../js/theme/colors.json';

const measure: Measure = {
  values: {},
  infos: {
    client: {
      name: 'Saalihou Ndiaye',
      phone: '77 245 65 56',
    },
    notes: 'Bazin riche demi fil taille 70',
  },
  images: ['http://placehold.it/300x300', 'http://placehold.it/400x400'],
};

storiesOf('MeasureListItem', module)
  .addDecorator(getStory => (
    <View style={{ flex: 1, backgroundColor: colors.PRIMARY_DIM, padding: 10 }}>{getStory()}</View>
  ))
  .add('with basic props', () => <MeasureListItem item={measure} />);
