import axios from 'axios';
import * as types from '../common/actionTypes';

export function fetchCategories(callback = () => {}) {
  return async dispatch => {
    const res = await axios.get('/categories.csv');
    dispatch({
      type: types.REPLACE_CATEGORIES,
      payload: res.data,
    });
    callback();
  };
}
