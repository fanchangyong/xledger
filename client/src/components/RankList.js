import React from 'react';
import PropTypes from 'prop-types';
import styles from './RankList.cm.styl';

function RankList({ bills, categoryEntities }) {
  return (
    <div className={styles.base}>
      {bills.map((bill, idx) => {
        const {
          id,
          categoryId,
          amount,
        } = bill;
        const category = categoryEntities[categoryId] || {};
        return (
          <div key={id} className={styles.row}>
            <span className={styles.rank}>
              {idx + 1}
            </span>
            <span className={styles.category}>{category.name}</span>
            <span className={styles.amount}>
              {amount.toFixed(2)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

RankList.defaultProps = {};

RankList.propTypes = {
  bills: PropTypes.array,
  categoryEntities: PropTypes.object,
};

export default RankList;
