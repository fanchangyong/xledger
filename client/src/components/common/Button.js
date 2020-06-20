import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classNamesBind from 'classnames/bind';
import Icon from './Icon';
import styles from './Button.cm.styl';

const cx = classNamesBind.bind(styles);

const Button = React.forwardRef(function Button(props, ref) {
  const {
    type,
    size,
    color,
    icon,
    disabled,
    loading,
    scale,
    light,
    shape,
    align,
    danger,
    submit,
    children,
    block,
    onClick,
  } = props;

  const className = classNames(cx(
    'btn',
    { [`btn-type-${type}`]: type },
    { [`btn-sz-${size}`]: size },
    { [`btn-shape-${shape}`]: shape },
    { [`btn-color-${color}`]: color },
    { [`btn-align-${align}`]: align },
    { 'btn-disabled': disabled },
    { 'btn-loading': loading },
    { 'btn-danger': danger },
    { 'btn-light': light },
    { block },
    { scale: scale && !disabled },
  ), props.className);

  return (
    <button
      ref={ref}
      type={submit ? 'submit' : 'button'}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && (
        <Icon name="loading" spin className={styles.icon} />
      )}
      {!!icon && (
        <Icon name={icon} className={styles.icon} />
      )}
      {children}
    </button>
  );
});

Button.propTypes = {
  type: PropTypes.string.isRequired,
  submit: PropTypes.bool,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  light: PropTypes.bool,
  shape: PropTypes.string,
  align: PropTypes.string,
  block: PropTypes.bool,
  color: PropTypes.string,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  scale: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Button.defaultProps = {
  disabled: false,
  size: 'middle',
  type: 'filled',
  color: 'primary',
  className: null,
  onClick: null,
  children: null,
};

export default Button;
