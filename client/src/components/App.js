import React from 'react';
import Ledger from './Ledger';

import styles from './App.cm.styl';

function App() {
  return (
    <div className={styles.base}>
      <div className={styles.content}>
        <a className={styles.logo} href="/">
          XLedger
        </a>
        <Ledger />
      </div>
    </div>
  );
}

App.propTypes = {
};

export default App;
