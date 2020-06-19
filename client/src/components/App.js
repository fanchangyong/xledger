import React from 'react';
import Ledger from './Ledger';

import styles from './App.cm.styl';

function App() {
  return (
    <div className={styles.base}>
      <div className={styles.content}>
        <div className={styles.logo}>
          XLedger
        </div>
        <Ledger />
      </div>
    </div>
  );
}

App.propTypes = {
};

export default App;
