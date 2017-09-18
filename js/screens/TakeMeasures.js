import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationStackScreenOptions } from 'react-navigation';
import ViewPager from 'react-native-tabbed-view-pager-android';

import screen from '../hoc/screen';
import Mannequin from '../components/measure/Mannequin';
import FormSection from '../components/FormSection';
import Input from '../components/Input';
import colors from '../theme/colors.json';

class TakeMeasures extends Component {
  static navigationOptions: NavigationStackScreenOptions = {
    headerTitle: 'Prendre mesures',
  };

  render() {
    return (
      <View style={styles.container}>
        <ViewPager
          tabNames={['Mesures', 'Informations']}
          style={{ flex: 1 }}
          tabMode="fixed"
          tabIndicatorColor={colors.ACCENT}
        >
          <View style={styles.page}>
            <Mannequin />
          </View>
          <View style={styles.page}>
            <FormSection submitLabel="Enregistrer">
              <Input name="client" placeholder="Client" icon="person" />
              <Input name="phone" placeholder="Téléphone" icon="phone" keyboardType="numeric" />
              <Input
                name="notes"
                placeholder="Notes"
                multiline
                numberOfLines={3}
                autoCapitalize="sentences"
                style={{ fontSize: 16 }}
              />
            </FormSection>
          </View>
        </ViewPager>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
});

export default screen(TakeMeasures);
