import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Form from './common/Form';
import useForm from '../hooks/useForm';
import Dialog from './common/Dialog';
import Select from './common/Select';
import Input from './common/Input';
import { BILL_TYPES } from '../common/constants';
import RadioGroup from './common/RadioGroup';

import styles from './CreateBill.cm.styl';

function CreateBill({ isOpen, onClose, onSubmit, categoryEntities }) {
  const validationSchema = yup.object().shape({
    amount: yup.string().required('请输入金额'),
    categoryId: yup.string().required('请选择分类'),
  });
  const form = useForm({
    initialValues: {
      type: BILL_TYPES.INCOME,
      amount: '',
      categoryId: '',
    },
    validationSchema,
    onSubmit,
    validateOnChange: false,
    submitOnChange: false,
  });

  const categoryOptions = Object.keys(categoryEntities)
    .filter(categoryId => categoryEntities[categoryId].type === form.values.type)
    .map(categoryId => {
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
    <Dialog isOpen={isOpen} onClose={onClose} title="添加账单" onOk={form.handleSubmit}>
      <Form form={form}>
        <div className={styles.row}>
          <label className={styles.label}>收支：</label>
          <RadioGroup name="type" options={billTypeOptions} />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>金额：</label>
          <Input type="number" name="amount" placeholder="请输入金额" />
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
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  categoryEntities: PropTypes.object,
};

export default CreateBill;
