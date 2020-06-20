import Papa from 'papaparse';
import * as types from '../common/actionTypes';

const initialState = {
  bills: [],
};

function sortBills(bills) {
  return [...bills].sort((a, b) => a.time < b.time);
}

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
      const sortedBills = sortBills(bills);
      return Object.assign({}, state, {
        bills: sortedBills,
      });
    }
    case types.ADD_BILL: {
      const bills = state.bills.concat([{
        ...action.payload,
        amount: Number(action.payload.amount),
        time: new Date(),
        id: state.bills.length + 1,
      }]);

      const sortedBills = sortBills(bills);

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
