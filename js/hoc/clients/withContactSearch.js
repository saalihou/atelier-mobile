// @flow
import React, { Component } from 'react';
import type { ComponentType } from 'react';
import Contacts from 'react-native-contacts';
import { debounce } from 'lodash';

export type WithContactSearchProps = {
  term: string,
  minSearchLen: number,
};

type WithContactSearchState = {
  contacts: Array<Contact>,
  err?: Object,
};

type PhoneNumber = {
  label: string,
  number: string,
};

type Contact = {
  recordID: string,
  givenName: string,
  middleName: string,
  familyName: string,
  phoneNumbers: Array<PhoneNumber>,
  hasThumbnail: boolean,
  thumbnailPath: string,
};

type RequiredListProps = {
  data: Array<Object>,
  loading: boolean,
};

export default function withContactSearch(
  contactToItemMapper: Contact => any,
): (ComponentType<RequiredListProps>) => ComponentType<WithContactSearchProps> {
  return (List) => {
    class Wrapper extends Component<WithContactSearchProps, WithContactSearchState> {
      state = {
        contacts: [],
      };

      static defaultProps = {
        minSearchLen: 2,
      };

      componentWillMount() {
        this.search(this.props.term);
      }

      componentWillReceiveProps(nextProps) {
        if (this.props.term !== nextProps.term) {
          this.search(nextProps.term);
        }
      }

      search = debounce((term: string) => {
        if (!term) {
          this.setState({ contacts: [] });
          return;
        }
        if (term.length < this.props.minSearchLen) {
          return;
        }
        Contacts.getContactsMatchingString(term, (err, contacts: Array<Contact>) => {
          // ignore callback if the term has changed
          // that is if the user entered a new term but a previous
          // search was already initiated
          if (this.props.term !== term) {
            return;
          }
          if (err) {
            this.setState({
              err,
            });
          }
          this.setState({ contacts });
        });
      }, 300);

      render() {
        const { contacts } = this.state;
        const { term, minSearchLen, ...additionalListProps } = this.props;
        return (
          <List data={contacts.map(contactToItemMapper)} loading={false} {...additionalListProps} />
        );
      }
    }

    Wrapper.displayName = `withContactSearch(${List.displayName || ''})`;

    return Wrapper;
  };
}
