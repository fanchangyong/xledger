import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import useField from '../../hooks/useField';
import useScrollIntoView from '../../hooks/useScrollIntoView';
import classNames from 'classnames';
import Icon from './Icon';
import SelectBase from './SelectBase';
import styles from './MonthSelect.cm.styl';

function formatDate(year, month) {
  if (month >= 10) {
    return `${year}-${month}`;
  }
  return `${year}-0${month}`;
}

function splitDate(dateStr) {
  if (!dateStr) {
    return {};
  }
  const splited = dateStr.split('-');
  if (splited.length < 2) {
    return {};
  }
  const year = Number(splited[0]);
  const month = Number(splited[1]);
  return { year, month };
}

const initialState = {
  opened: false,
  showType: 'year',
  selectedYear: null,
  selectedMonth: null,
};

function reducer(state, msg) {
  const {
    type,
    payload,
  } = msg;
  switch (type) {
    case 'SET_OPENED': {
      return {
        ...state,
        opened: payload,
        showType: 'year',
      };
    }
    case 'SET_VALUE': {
      return {
        ...state,
        selectedYear: payload.year,
        selectedMonth: payload.month,
      };
    }
    case 'SET_SELECTED_YEAR': {
      return {
        ...state,
        selectedYear: payload,
        showType: 'month',
      };
    }
    case 'SET_SELECTED_MONTH': {
      return {
        ...state,
        selectedMonth: payload,
        opened: false,
      };
    }
    case 'SET_SHOW_TYPE': {
      return {
        ...state,
        showType: payload,
      };
    }
    default: {
      return state;
    }
  }
}

const dt = new Date();
const curYear = dt.getFullYear();
const years = [];
for (let i = curYear; i >= 1950; i -= 1) {
  years.push(i);
}

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function Menu({ data, selected, setSelected }) {
  const selectedItemRef = useScrollIntoView();

  return (
    <div className={styles.menuContainer}>
      {data.map(d => (
        <span
          key={d}
          ref={selected === d ? selectedItemRef : null}
          className={classNames(styles.menuItem, selected === d && styles.activeMenuItem)}
          onClick={() => setSelected(d)}
        >
          {d}
        </span>
      ))}
    </div>
  );
}

Menu.propTypes = {
  data: PropTypes.array,
  selected: PropTypes.number,
  setSelected: PropTypes.func,
};

function MonthSelect(props) {
  const {
    name,
    label,
  } = props;

  const [field] = useField(name);

  if (!props.handleChange && !field) {
    throw new Error('Must pass props.handleChange or make Select inside a Form');
  }

  let value;
  if (typeof props.value !== 'undefined') {
    value = props.value;
  } else if (field) {
    value = field.value;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    opened,
    showType,
    selectedYear,
    selectedMonth,
  } = state;

  useEffect(() => {
    if (value) {
      const { year, month } = splitDate(value);
      dispatch({ type: 'SET_VALUE', payload: { year, month } });
    }
  }, [value]);

  function handleChange(value) {
    if (props.handleChange) {
      props.handleChange(value);
    } else {
      field.handleChange(name, value);
    }
  }

  function setSelected(d) {
    if (showType === 'year') {
      dispatch({ type: 'SET_SELECTED_YEAR', payload: d });
      if (selectedMonth) {
        handleChange(formatDate(d, selectedMonth));
      }
    } else if (showType === 'month') {
      dispatch({ type: 'SET_SELECTED_MONTH', payload: d });
      handleChange(formatDate(selectedYear, d));
    }
  }

  return (
    <SelectBase
      name={name}
      value={value}
      label={label}
      opened={opened}
      setOpened={opened => dispatch({ type: 'SET_OPENED', payload: opened })}
    >
      <div className={styles.base}>
        <div className={styles.menuTitle}>
          {showType === 'month' && (
            <Icon
              name="backward"
              className={styles.backIcon}
              onClick={() => dispatch({ type: 'SET_SHOW_TYPE', payload: 'year' })} />
          )}
          {showType === 'year' ? '请选择年份' : `${selectedYear}年`}
        </div>
      </div>
      <Menu
        data={showType === 'year' ? years : months}
        selected={showType === 'year' ? selectedYear : selectedMonth}
        setSelected={setSelected}
      />
    </SelectBase>
  );
}

MonthSelect.defaultProps = {};

MonthSelect.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.any,
  label: PropTypes.string,
};

export default MonthSelect;
