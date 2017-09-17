// @flow
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { autobind } from 'core-decorators';
import { isUndefined } from 'lodash';

import Input from './Input';
import Button from './Button';
import type { InputProps } from './Input';

export type FormSectionProps = {
  children: any,
  submitLabel: string,
  onChange?: (values: Object) => void,
  onSubmit?: (values: Object) => void,
};

@autobind
class FormSection extends Component {
  props: FormSectionProps;

  static defaultProps = {
    onChange: () => undefined,
    onSubmit: () => undefined,
  };

  state: {
    values: {},
  };

  constructor(props: FormSectionProps) {
    super(props);
    this.state = {
      values: {},
    };
    React.Children.forEach(props.children, (c) => {
      this.state.values[c.props.name] = !isUndefined(c.props.value)
        ? c.props.value
        : c.props.defaultValue;
    });
  }

  onChange(name: string, value: string) {
    this.setState(
      {
        values: {
          ...this.state.values,
          [name]: value,
        },
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.values);
        }
      },
    );
  }

  onSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.values);
    }
  }

  renderInput(e: React.Element<typeof Input>) {
    const additionalProps: InputProps = {
      onChangeText: (value) => {
        this.onChange(e.props.name, value);
        if (e.props.onChangeText) {
          e.props.onChangeText(value);
        }
      },
    };
    return React.cloneElement(e, additionalProps);
  }

  render() {
    const { children, submitLabel } = this.props;
    return (
      <View>
        {React.Children.map(children, e => this.renderInput(e))}
        <View style={styles.submitContainer}>
          <Button onPress={() => this.onSubmit()} label={submitLabel} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  submitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormSection;
