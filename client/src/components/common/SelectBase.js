import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Dropdown from './Dropdown';
import Icon from './Icon';
import { genId } from '../../common/util';
import styles from './SelectBase.cm.styl';

const cx = classNames.bind(styles);

function SelectBase(props) {
  const {
    name,
    value,
    opened,
    error,
    setOpened,
    children,
  } = props;

  const inputRef = useRef(null);

  const idRef = useRef(genId('select'));
  const id = idRef.current;

  return (
    <div className={styles.base}>
      <div onClick={() => setOpened(!opened)} className={styles.inputWrapper}>
        <input
          ref={inputRef}
          id={id}
          name={name}
          value={value || ''}
          className={classNames(styles.input, opened && styles.focus)}
          readOnly
        />
        <Icon
          name="triangle"
          className={styles.iconArrow}
          rotate={opened ? 180 : 0}
          size="12px"
        />
      </div>
      <span className={styles.error}>{error}</span>
      <Dropdown
        isOpen={opened}
        anchorEl={inputRef.current}
        onClickOutside={() => setOpened(false)}
      >
        <div className={cx(styles.menu)}>
          {children}
        </div>
      </Dropdown>
    </div>
  );
}

SelectBase.defaultProps = {
};

SelectBase.propTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  opened: PropTypes.bool,
  setOpened: PropTypes.func,
  children: PropTypes.node,
};

export default SelectBase;
