import Papa from 'papaparse';
import * as types from '../common/actionTypes';

const initialState = {
  bills: [],
};

function billsReducer(state = initialState, action) {
  switch (action.type) {
    case types.REPLACE_BILLS: {
      const csvString = action.payload;
      const result = Papa.parse(csvString, { header: true });
      const bills = result.data.map((d, idx) => ({
        type: Number(d.type),
        amount: Math.abs(Number(d.amount)),
        time: new Date(Number(d.time)),
        categoryId: d.category,
        id: idx,
      }));
      const sortedBills = [...bills].sort((a, b) => a.time < b.time);
      return Object.assign({}, state, {
        bills: sortedBills,
      });
    }
    default: {
      return state;
    }
  }
}

export default billsReducer;
