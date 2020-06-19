import { useContext } from 'react';
import { FormContext } from '../components/common/Form';

function useField(name) {
  const form = useContext(FormContext);

  if (!form) {
    return [];
  }

  return [
    form.getFieldProps(name),
    form.getFieldMeta(name),
  ];
}

export default useField;
