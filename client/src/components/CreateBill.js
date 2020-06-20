import React from 'react';
import PropTypes from 'prop-types';
import Form from './common/Form';
import useForm from '../hooks/useForm';
import Dialog from './common/Dialog';
import Select from './common/Select';
import Input from './common/Input';
import { BILL_TYPES } from '../common/constants';
import RadioGroup from './common/RadioGroup';

import styles from './CreateBill.cm.styl';

function CreateBill({ isOpen, categoryEntities }) {
  const form = useForm({
    onSubmit: () => {},
    validateOnChange: false,
    submitOnChange: false,
  });

  const categoryOptions = Object.keys(categoryEntities).map(categoryId => {
    return {
      value: categoryId,
      label: categoryEntities[categoryId].name,
    };
  });

  const billTypeOptions = [
    {
      label: '收入',
      value: BILL_TYPES.INCOME,
    },
    {
      label: '支出',
      value: BILL_TYPES.EXPENSE,
    },
  ];

  return (
    <Dialog isOpen={isOpen} title="添加账单">
      <Form form={form}>
        <div className={styles.row}>
          <label className={styles.label}>收支：</label>
          <RadioGroup name="billType" options={billTypeOptions} />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>金额：</label>
          <Input name="amount" placeholder="请输入金额" />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>分类：</label>
          <Select name="categoryId" options={categoryOptions} />
        </div>
      </Form>
    </Dialog>
  );
}

CreateBill.defaultProps = {};

CreateBill.propTypes = {
  isOpen: PropTypes.bool,
  categoryEntities: PropTypes.object,
};

export default CreateBill;
