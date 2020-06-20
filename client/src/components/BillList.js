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
      categoryId,
      time,
      amount,
    } = bill;

    const category = categoryEntities[categoryId] || {};

    return (
      <div key={id} className={styles.bill}>
        <CashFlowIcon type={type} />
        <div className={styles.billDetail}>
          <div className={styles.billDetailLeft}>
            <div className={styles.category}>
              {category.name}
            </div>
            <div className={styles.time}>
              {time.getFullYear()}-{time.getMonth()}-{time.getDate()} {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
            </div>
          </div>
          <div className={styles.billAmount} style={{ color: BILL_TYPE_COLORS[type] }}>
            {type === BILL_TYPES.INCOME ? '+' : '-'}
            {amount.toFixed(2)}
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
