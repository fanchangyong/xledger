import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import SelectBase from './SelectBase';
import useField from '../../hooks/useField';
import { isString } from '../../common/util';
import styles from './Select.cm.styl';

const cx = classNames.bind(styles);

function Select(props) {
  const {
    name,
    label,
  } = props;

  const [opened, setOpened] = useState(false);

  const [field] = useField(name);

  if (!props.handleChange && !field) {
    throw new Error('Must pass props.handleChange or make Select inside a Form');
  }

  let value;
  if (typeof props.value !== 'undefined') {
    value = props.value;
  } else if (field) {
    value = field.value;
  }

  const options = props.options.map(opt => {
    if (isString(opt)) {
      return {
        label: opt,
        value: opt,
      };
    }

    return opt;
  });

  const selectedOption = options.find(opt => opt.value === value) || {};

  return (
    <SelectBase
      name={name}
      value={selectedOption.label}
      label={label}
      opened={opened}
      setOpened={setOpened}
    >
      <div onClick={() => setOpened(false)} className={styles.menuContainer}>
        {options.map(({ label: optLabel, value: optValue }) => {
          return (
            <div
              key={optValue}
              className={cx(styles.menuItem, value === optValue && styles.activeMenuItem)}
              onClick={() => props.handleChange ? props.handleChange(optValue) : field.handleChange(name, optValue)}
            >
              {optLabel}
            </div>
          );
        })}
      </div>
    </SelectBase>
  );
}

Select.defaultProps = {};

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.array,
};

export default Select;
