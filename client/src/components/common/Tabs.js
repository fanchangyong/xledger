import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Tabs.cm.styl';

function Tabs({ options, value, onChange, className }) {
  return (
    <div className={classNames(styles.base, className)}>
      {options.map(opt => {
        return (
          <span
            className={classNames(styles.tab, value === opt.value && styles.active)}
            key={opt.value}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </span>
        );
      })}
    </div>
  );
}

Tabs.defaultProps = {};

Tabs.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default Tabs;
