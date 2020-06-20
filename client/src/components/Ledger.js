import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import GroupButton from './common/GroupButton';
import MonthSelect from './common/MonthSelect';
import Select from './common/Select';
import BillList from './BillList';
import { fetchBills } from '../actions/bill';
import { fetchCategories } from '../actions/category';

import styles from './Ledger.cm.styl';

const SHOW_TYPES = {
  LEDGER: '账单',
  RANK: '排行榜',
};

function Ledger() {
  const dispatch = useDispatch();
  const bills = useSelector(state => {
    return state.bills.bills;
  });

  const categoryEntities = useSelector(state => {
    return state.categories.categoryEntities;
  });

  const [loadingBills, setLoadingBills] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingBills(true);
    dispatch(fetchBills(() => {
      setLoadingBills(false);
    }));
  }, []);

  useEffect(() => {
    setLoadingCategories(true);
    dispatch(fetchCategories(() => {
      setLoadingCategories(false);
    }));
  }, []);

  const [showType, setShowType] = useState(SHOW_TYPES.LEDGER);
  const [category, setCategory] = useState('all');
  const [month, setMonth] = useState('全部');

  const showTypeOptions = Object.keys(SHOW_TYPES).map(k => SHOW_TYPES[k]);
  const categoryOptions = Object.keys(categoryEntities).map(categoryId => {
    return {
      value: categoryId,
      label: categoryEntities[categoryId].name,
    };
  });

  categoryOptions.splice(0, 0, {
    value: 'all',
    label: '全部',
  });

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <div>
          账单
        </div>
        <div className={styles.iconPlus}>
          +
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.innerBox}>
          <GroupButton options={showTypeOptions} value={showType} onChange={setShowType} />
        </div>
        <div className={styles.innerBox}>
          <div className={styles.filter}>
            <div className={styles.filterLeft}>
              <div className={styles.filterRow}>
                选择月份：
                <MonthSelect
                  handleChange={setMonth}
                  value={month}
                />
              </div>
              <div className={styles.filterRow}>
                选择分类：
                <Select options={categoryOptions} value={category} handleChange={setCategory} />
              </div>
            </div>
            <div className={styles.filterRight}>
              <div className={styles.summaryLabel}>
                <div>
                  收入：
                </div>
                <div>
                  支出：
                </div>
              </div>
              <div className={styles.summaryData}>
                <div>
                  +13000
                </div>
                <div>
                  -900
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.innerBox}>
          {(loadingBills || loadingCategories) ? (
            <div>
              正在加载数据...
            </div>
          ) : (
            <>
              <BillList bills={bills} categoryEntities={categoryEntities} />
              <div className={styles.noMore}>
                没有更多了...
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Ledger.propTypes = {
  bills: PropTypes.array,
};

export default Ledger;
