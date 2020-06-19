import { useLayoutEffect, useCallback } from 'react';

function useClickOutside(ignoredNodes, onClickOutside, enabled) {
  const handleClick = useCallback(function handleClick(e) {
    let ignored = false;
    ignoredNodes.forEach(n => {
      if (n && n.contains(e.target)) {
        ignored = true;
      }
    });

    if (ignored) {
      return;
    }

    onClickOutside();
  }, [onClickOutside, ignoredNodes]);

  useLayoutEffect(() => {
    if (enabled) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick, enabled]);
}

export default useClickOutside;
