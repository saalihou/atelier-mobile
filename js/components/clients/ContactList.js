import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ripple from 'react-native-material-ripple';

import colors from '../../theme/colors.json';

export type Contact = {
  name: string,
  phone: string,
};

export type ContactListProps = {
  data: Array<Contact>,
  loading: boolean,
};

const ContactListItem = ({ contact }: { contact: Contact }) => (
  <Ripple style={itemStyles.container} rippleDuration={600}>
    <Icon name="person" size={24} color={colors.PRIMARY_FOREGROUND} />
    <View style={itemStyles.infos}>
      <Text style={[itemStyles.infoText, itemStyles.name]}>{contact.name}</Text>
      <Text style={[itemStyles.infoText, itemStyles.phone]}>{contact.phone}</Text>
    </View>
  </Ripple>
);

class ContactList extends Component<ContactListProps> {
  render() {
    const { data, loading } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => <ContactListItem contact={item} />}
          keyExtractor={c => c.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

const itemStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    borderBottomColor: colors.ACCENT,
    borderBottomWidth: 0.75,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
  },
  infos: {
    paddingLeft: 10,
  },
  infoText: {
    color: colors.PRIMARY_FOREGROUND,
  },
  name: {
    fontSize: 16,
  },
  phone: {
    fontSize: 14,
  },
});

export default ContactList;
