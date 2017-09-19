// @flow
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { autobind } from 'core-decorators';
import { isUndefined, find, set, clone } from 'lodash';
import validate from 'validate.js';

import Input from './Input';
import Button from './Button';
import type { InputProps } from './Input';

export type FormSectionProps = {
  children: any,
  validators: Object,
  submitLabel: string,
  onChange: (values: Object) => void,
  onSubmit: (values: Object) => void,
};

@autobind
class FormSection extends Component<FormSectionProps, $FlowFixMeState> {
  static defaultProps = {
    onChange: () => undefined,
    onSubmit: () => undefined,
    validators: {},
  };

  state = {
    values: {},
    errors: {},
    touched: {},
  };

  constructor(props: FormSectionProps) {
    super(props);
    this.state = {
      values: {},
      errors: {},
      touched: {},
    };
    React.Children.forEach(props.children, (c) => {
      const inputName = c.props.name;
      const inputValue = !isUndefined(c.props.value) ? c.props.value : c.props.defaultValue;
      set(this.state.values, inputName, inputValue);
      this.state.errors[inputName] =
        validate.single(inputValue, props.validators[inputName], {
          format: 'flat',
        }) || [];
    });
  }

  onChange(name: string, value: string) {
    this.validate(name, value);
    const newValues = clone(this.state.values);
    set(newValues, name, value);
    this.setState(
      {
        values: newValues,
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

  validate(name: string, value: string) {
    if (!this.props.validators) {
      return;
    }
    const validator = this.props.validators[name];
    if (!validator) {
      return;
    }
    const errors = validate.single(value, validator, { format: 'flat' }) || [];
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: errors,
      },
    });
  }

  onBlur(name: string) {
    this.setState({
      touched: {
        ...this.state.touched,
        [name]: true,
      },
    });
  }

  renderInput(e: React.Element<React.ComponentType<typeof Input>>) {
    const { errors, touched } = this.state;
    const additionalProps: InputProps = {
      onChangeText: (value) => {
        this.onChange(e.props.name, value);
        if (e.props.onChangeText) {
          e.props.onChangeText(value);
        }
      },
      onBlur: () => {
        this.onBlur(e.props.name);
        if (e.props.onBlur) {
          e.props.onBlur();
        }
      },
      error: touched[e.props.name] && errors[e.props.name][0],
    };
    return React.cloneElement(e, additionalProps);
  }

  render() {
    const { children, submitLabel } = this.props;
    const { errors } = this.state;
    return (
      <View>
        {React.Children.map(children, e => this.renderInput(e))}
        <View style={styles.submitContainer}>
          <Button
            disabled={!!find(errors, v => v.length !== 0)}
            onPress={() => this.onSubmit()}
            label={submitLabel}
          />
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
