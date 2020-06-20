import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import useField from '../../hooks/useField';

import styles from './Input.cm.styl';

const cx = classNames.bind(styles);

const Input = React.forwardRef(function Input(props, ref) {
  const {
    name,
    label,
    className,
    inputClassName,
    ...others
  } = props;

  const containerRef = useRef(null);

  const [field, meta] = useField(name);
  const {
    error,
    touched,
  } = meta;

  const {
    value,
    handleDOMChange,
  } = field;

  return (
    <div className={classNames(styles.container, className)} ref={containerRef}>
      <div className={styles.inputWrapper}>
        <input
          ref={ref}
          name={name}
          value={value || ''}
          className={classNames(styles.input, inputClassName)}
          onChange={handleDOMChange}
          {...others}
        />
      </div>
      {error && <div className={cx(styles.error, { show: touched })}>{error}</div>}
    </div>
  );
});

Input.propTypes = {
  name: PropTypes.string.isRequired,
  validator: PropTypes.func,
  label: PropTypes.string,
  defaultShrink: PropTypes.bool,
  error: PropTypes.string,
  containerClassName: PropTypes.string,
  afterAddon: PropTypes.any,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  search: PropTypes.func,
};

export default Input;
