// @flow
import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ripple from 'react-native-material-ripple';

import colors from '../../theme/colors.json';

type Contact = {
  id: string,
  name: string,
  phone: string,
};

type ContactSelectCallback = (c: Contact) => void;

export type ContactListProps = {
  data: Array<Contact>,
  loading: boolean,
  onSelect: ContactSelectCallback,
};

const ContactListItem = ({
  contact,
  onPress,
}: {
  contact: Contact,
  onPress: ContactSelectCallback,
}) => (
  <Ripple style={itemStyles.container} rippleDuration={600} onPress={() => onPress(contact)}>
    <Icon name="person" size={24} color={colors.PRIMARY_FOREGROUND} />
    <View style={itemStyles.infos}>
      <Text style={[itemStyles.infoText, itemStyles.name]}>{contact.name}</Text>
      <Text style={[itemStyles.infoText, itemStyles.phone]}>{contact.phone}</Text>
    </View>
  </Ripple>
);

class ContactList extends Component<ContactListProps> {
  render() {
    const { data, loading, onSelect } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => <ContactListItem contact={item} onPress={onSelect} />}
          keyExtractor={c => c.id}
          initialNumToRender={50}
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
