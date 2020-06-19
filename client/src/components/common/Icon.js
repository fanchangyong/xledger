import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tippy from '@tippyjs/react';

import styles from './Icon.cm.styl';

const Icon = React.forwardRef(function Icon({ name, spin, className, style, onClick, tooltip, rotate, size }, ref) {
  let customStyle = {
    lineHeight: 1,
  };
  if (style) {
    customStyle = { ...style };
  }
  if (rotate) {
    customStyle.transform = `rotate(${rotate}deg)`;
  }

  if (size) {
    customStyle.fontSize = size;
  }

  const icon = (
    <i
      ref={ref}
      className={classNames('iconfont', `icon-${name}`, styles.icon, spin && styles.spin, className)}
      style={customStyle}
      onClick={onClick}
    />
  );

  if (tooltip) {
    return (
      <Tippy content={tooltip}>
        {icon}
      </Tippy>
    );
  }

  return icon;
});

Icon.propTypes = {
  className: PropTypes.string,
  spin: PropTypes.bool,
  style: PropTypes.object,
  size: PropTypes.string,
  rotate: PropTypes.number,
  name: PropTypes.string,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
};

export default Icon;
