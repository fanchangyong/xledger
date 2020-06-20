import React from 'react';
import PropTypes from 'prop-types';
import useField from '../../hooks/useField';
import { genId } from '../../common/util';
import styles from './RadioGroup.cm.styl';

function RadioGroup({ name, options }) {
  const [field] = useField(name);

  return (
    <div className={styles.base}>
      {options.map(opt => {
        const fieldId = genId('radio');
        return (
          <span key={opt.label} className={styles.item}>
            <input id={fieldId} type="radio" value={opt.value} checked={opt.value === field.value} onChange={e => field.handleChange(name, Number(e.target.value))} />
            <label className={styles.label} htmlFor={fieldId}>{opt.label}</label>
          </span>
        );
      })}
    </div>
  );
}

RadioGroup.defaultProps = {};

RadioGroup.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default RadioGroup;
