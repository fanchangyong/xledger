import React from 'react';
import PropTypes from 'prop-types';
import { BILL_TYPES, BILL_TYPE_COLORS } from '../common/constants';

import styles from './BillList.cm.styl';

function CashFlowIcon({ type }) {
  let text;
  if (type === BILL_TYPES.EXPENSE) {
    text = '支';
  } else if (type === BILL_TYPES.INCOME) {
    text = '收';
  }

  const customStyle = {
    background: BILL_TYPE_COLORS[type],
  };

  return (
    <span className={styles.iconCashFlow} style={customStyle}>
      {text}
    </span>
  );
}

CashFlowIcon.propTypes = {
  type: PropTypes.number,
};

function BillList({ bills, categoryEntities }) {
  return bills.map(bill => {
    const {
      id,
      type,
      category,
      time,
      amount,
    } = bill;

    const dt = new Date(time);

    return (
      <div key={id} className={styles.bill}>
        <CashFlowIcon type={type} />
        <div className={styles.billDetail}>
          <div className={styles.billDetailLeft}>
            <div className={styles.category}>
              {categoryEntities[category].name}
            </div>
            <div className={styles.time}>
              {dt.getFullYear()}-{dt.getMonth()}-{dt.getDate()} {dt.getHours()}:{dt.getMinutes()}:{dt.getSeconds()}
            </div>
          </div>
          <div className={styles.billAmount} style={{ color: BILL_TYPE_COLORS[type] }}>
            {type === BILL_TYPES.INCOME ? '+' : '-'}
            {amount}
          </div>
        </div>
      </div>
    );
  });
}

BillList.defaultProps = {};

BillList.propTypes = {
};

export default BillList;
