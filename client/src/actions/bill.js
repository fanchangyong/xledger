import axios from 'axios';
import * as types from '../common/actionTypes';

export function fetchBills(callback = () => {}) {
  return async dispatch => {
    const res = await axios.get('https://raw.githubusercontent.com/xmindltd/hiring/master/frontend-1/bill.csv');
    dispatch({
      type: types.REPLACE_BILLS,
      payload: res.data,
    });
    callback();
  };
}
