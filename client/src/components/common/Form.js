import React from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext();

function Form(props) {
  const {
    form,
    children,
  } = props;

  return (
    <FormContext.Provider value={form}>
      <form onSubmit={form.handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

Form.defaultProps = {};

Form.propTypes = {
  form: PropTypes.object,
  children: PropTypes.node,
};

export default Form;
