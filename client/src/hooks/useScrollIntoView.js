import { useCallback } from 'react';

function useScrollIntoView() {
  return useCallback(node => {
    if (node !== null) {
      node.scrollIntoView({ block: 'nearest' });
    }
  }, []);
}

export default useScrollIntoView;
