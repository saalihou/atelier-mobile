import React, { PureComponent } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { NavigationStackScreenOptions, NavigationScreenProp } from 'react-navigation';
import ViewPager from 'react-native-tabbed-view-pager-android';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';

import screen from '../hoc/screen';
import Mannequin from '../components/measure/Mannequin';
import FormSection from '../components/FormSection';
import ContactList, { type Contact } from '../components/clients/ContactList';
import withContactSearch from '../hoc/clients/withContactSearch';
import ImagePicker from '../containers/ImagePicker';
import Input from '../components/Input';
import colors from '../theme/colors.json';
import { nameValidator, phoneValidator } from '../validators/measure/clientInfos';
import { saveMeasure, Measure } from '../actions/measure';

const ContactSearchList = withContactSearch(c => ({
  id: c.recordID,
  name: [c.givenName, c.middleName, c.familyName].filter(v => v && v.length > 0).join(' '),
  phone: c.phoneNumbers[0].number,
}))(ContactList);

type TakeMeasuresProps = {
  saving: boolean,
  saveMeasure: (m: Measure) => void,
  navigation: NavigationScreenProp<{}, {}>,
};

@autobind
class TakeMeasures extends PureComponent<TakeMeasuresProps> {
  static navigationOptions: NavigationStackScreenOptions = {
    headerTitle: 'Prendre mesures',
  };

  state = {
    infos: {
      client: {
        name: '',
        phone: '',
      },
      notes: '',
    },
    values: {},
    images: [],
    displayContactSearch: true,
    submitted: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.submitted && nextProps.saving === false) {
      this.props.navigation.goBack();
    }
  }

  onContactSelect(c: Contact) {
    this.setState(
      {
        infos: {
          ...this.state.infos,
          client: {
            name: c.name,
            phone: c.phone,
          },
        },
      },
      () => this.setState({ displayContactSearch: false }),
    );
  }

  submit() {
    this.setState({
      submitted: true,
    });
    this.props.saveMeasure({
      infos: this.state.infos,
      values: this.state.values,
      images: this.state.images,
    });
  }

  render() {
    const { infos, displayContactSearch } = this.state;
    return (
      <View style={styles.container}>
        <ViewPager
          tabNames={['Mesures', 'Informations']}
          style={{ flex: 1 }}
          tabMode="fixed"
          tabIndicatorColor={colors.ACCENT}
        >
          <View style={styles.page}>
            <Mannequin onChange={values => this.setState({ values })} />
          </View>
          <View style={styles.page}>
            <ScrollView style={{ flex: 1 }}>
              <FormSection
                submitLabel="Enregistrer"
                validators={{ 'client.name': nameValidator, 'client.phone': phoneValidator }}
                onChange={newInfos => this.setState({ infos: newInfos })}
                onSubmit={this.submit}
              >
                <Input
                  value={infos.client.name}
                  name="client.name"
                  placeholder="Client"
                  icon="person"
                  onChangeText={() => this.setState({ displayContactSearch: true })}
                />
                {displayContactSearch && (
                  <ContactSearchList term={infos.client.name} onSelect={this.onContactSelect} />
                )}
                <Input
                  value={infos.client.phone}
                  name="client.phone"
                  placeholder="Téléphone"
                  icon="phone"
                  keyboardType="numeric"
                />
                <Input
                  value={infos.notes}
                  name="notes"
                  placeholder="Notes"
                  multiline
                  numberOfLines={3}
                  autoCapitalize="sentences"
                  style={{ fontSize: 16 }}
                />
                <ImagePicker onPick={images => this.setState({ images })} />
              </FormSection>
            </ScrollView>
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

const mapStateToProps = state => ({
  saving: state.measure.saving,
});

const mapDispatchToProps = dispatch => ({
  saveMeasure: measure => dispatch(saveMeasure(measure)),
});

export default screen(connect(mapStateToProps, mapDispatchToProps)(TakeMeasures));
