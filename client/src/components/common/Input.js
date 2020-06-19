import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.cm.styl';

function Input(props) {
  const {
    placeholder,
    value,
    onChange,
  } = props;

  return (
    <div className={styles.base}>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

Input.defaultProps = {};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
