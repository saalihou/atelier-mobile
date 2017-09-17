import React, { Component } from 'react';
import { View } from 'react-native';
import { autobind } from 'core-decorators';
import { isUndefined } from 'lodash';

import Input from './Input';
import type { InputProps } from './Input';

export type FormSectionProps = {
  children: any,
  onChange: (values: Object) => undefined,
};

@autobind
class FormSection extends Component {
  props: FormSectionProps;

  state: {
    values: {},
  };

  constructor(props) {
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
      () => this.props.onChange(this.state.values),
    );
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
    const { children } = this.props;
    return <View>{React.Children.map(children, e => this.renderInput(e))}</View>;
  }
}

export default FormSection;
