import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './GroupButton.cm.styl';

function GroupButton(props) {
  const {
    options,
    value,
    onChange,
  } = props;

  return (
    <div className={styles.base}>
      {options.map(opt => {
        return (
          <div
            key={opt}
            className={classNames(styles.btn, value === opt && styles.active)}
            onClick={() => onChange(opt)}
          >
            {opt}
          </div>
        );
      })}
    </div>
  );
}

GroupButton.defaultProps = {};

GroupButton.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default GroupButton;
