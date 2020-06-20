import axios from 'axios';
import * as types from '../common/actionTypes';

export function fetchBills(callback = () => {}) {
  return async dispatch => {
    const res = await axios.get('/bills.csv');
    dispatch({
      type: types.REPLACE_BILLS,
      payload: res.data,
    });
    callback();
  };
}

export function addBill(bill) {
  return dispatch => {
    dispatch({
      type: types.ADD_BILL,
      payload: bill,
    });
  };
}
