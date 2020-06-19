import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCallbackRef } from 'use-callback-ref';
import { usePopper } from 'react-popper';

import useClickOutside from '../../hooks/useClickOutside';

function Dropdown(props) {
  const {
    isOpen,
    anchorEl,
    children,
    placement,
    onClickOutside,
    maxWidth,
  } = props;

  const [, forceUpdate] = useState(null);

  let content;
  if (React.Children.count(children) > 1) {
    content = <div>{children}</div>;
  } else {
    content = children;
  }

  const ref = useCallbackRef(null, () => forceUpdate({}));
  useClickOutside([anchorEl, ref.current], onClickOutside, isOpen);

  const { styles, attributes } = usePopper(anchorEl, ref.current, {
    placement,
  });

  const customStyle = {
    zIndex: 1,
  };

  if (maxWidth) {
    customStyle.width = '100%';
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={ref}
      style={{ ...styles.popper, ...customStyle }}
      {...attributes.popper}
    >
      {content}
    </div>
  );
}

Dropdown.propTypes = {
  isOpen: PropTypes.bool,
  maxWidth: PropTypes.bool,
  anchorEl: PropTypes.any,
  children: PropTypes.node,
  placement: PropTypes.string,
  onClickOutside: PropTypes.func,
};

Dropdown.defaultProps = {
  placement: 'bottom-start',
  maxWidth: true,
};

export default Dropdown;
