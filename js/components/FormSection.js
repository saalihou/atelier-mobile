// @flow
import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { autobind } from 'core-decorators';
import { isUndefined, find, set, get, clone } from 'lodash';
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
class FormSection extends PureComponent<FormSectionProps, {}> {
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

  componentWillReceiveProps(nextProps) {
    React.Children.map(nextProps.children, (c) => {
      if (!c) {
        return;
      }
      const { name, value } = c.props;
      const currentValue = get(this.state.values, name);
      if (value === currentValue) {
        return;
      }
      this.onChange(name, value, false);
    });
  }

  onChange(name: string, value: string, notifyParent: boolean = true) {
    this.validate(name, value);
    const newValues = clone(this.state.values);
    set(newValues, name, value);
    this.setState({
      values: newValues,
    });
    if (notifyParent && this.props.onChange) {
      this.props.onChange(newValues);
    }
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
    if (!e) {
      return e;
    }
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
