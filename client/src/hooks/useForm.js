import { useRef, useReducer, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

function reducer(state, msg) {
  switch (msg.type) {
    case 'SET_VALUES': {
      return { ...state, values: msg.payload };
    }
    case 'SET_ERRORS': {
      return { ...state, errors: msg.payload };
    }
    case 'SET_TOUCHES': {
      return { ...state, touches: msg.payload };
    }
    case 'SET_VALUE': {
      return { ...state, values: { ...state.values, [msg.payload.name]: msg.payload.value } };
    }
    case 'SET_ERROR': {
      return { ...state, errors: { ...state.errors, [msg.payload.name]: msg.payload.error } };
    }
    case 'SET_TOUCH': {
      return { ...state, touches: { ...state.touches, [msg.payload.name]: msg.payload.touch } };
    }
    case 'SET_FOCUS': {
      return { ...state, focuses: { ...state.focuses, [msg.payload.name]: msg.payload.focus } };
    }
    default: {
      return state;
    }
  }
}

function useForm(props) {
  const {
    onSubmit,
    validateOnChange = true,
    submitOnChange = true,
    initialValues,
  } = props;

  const validationSchema = useRef(props.validationSchema);

  const [state, dispatch] = useReducer(reducer, {
    values: { ...initialValues },
    errors: {},
    touches: {},
    focuses: {},
  });

  const [debouncedSubmit] = useDebouncedCallback(trySubmit, 500);

  const {
    values,
    errors,
    touches,
    focuses,
  } = state;

  async function validateAllFields() {
    console.log('## validate all: ', values)
    const errors = {};
    try {
      await validationSchema.current.validate(values, {
        abortEarly: false,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.log('## error inner: ', error.inner)
        for (const err of error.inner) {
          errors[err.path] = err.message;
        }
      }
    }
    dispatch({ type: 'SET_ERRORS', payload: errors });
    return errors;
  }

  const validateField = useCallback(async function validateField(name, value) {
    let error = null;
    try {
      await validationSchema.current.fields[name].validate(value, {
        abortEarly: false,
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        error = err.inner[0].message;
      }
    }
    dispatch({
      type: 'SET_ERROR',
      payload: {
        name,
        error,
      },
    });
    return error;
  }, []);

  function touchAllFields() {
    const _touches = {};
    Object.keys(values).forEach(name => {
      _touches[name] = true;
    });
    dispatch({ type: 'SET_TOUCHES', payload: _touches });
  }

  function handleDOMChange(event) {
    const {
      name,
      value,
    } = event.target;
    handleChange(name, value);
  }

  const handleChange = useCallback(function handleChange(name, value) {
    dispatch({
      type: 'SET_VALUE',
      payload: {
        name,
        value,
      },
    });

    dispatch({
      type: 'SET_TOUCH',
      payload: {
        name,
        touch: true,
      },
    });

    if (validateOnChange) {
      validateField(name, value);
    }

    if (submitOnChange) {
      debouncedSubmit(name);
    }
  }, [debouncedSubmit, validateField, submitOnChange, validateOnChange]);

  async function handleBlur(e) {
    const name = e.target.name;
    dispatch({
      type: 'SET_FOCUS',
      payload: {
        name,
        focus: false,
      },
    });
  }

  function handleFocus(e) {
    const name = e.target.name;
    dispatch({
      type: 'SET_FOCUS',
      payload: {
        name,
        focus: true,
      },
    });
  }

  async function handleSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    await trySubmit();
  }

  async function trySubmit(name) {
    touchAllFields();
    const errors = await validateAllFields();
    if (Object.keys(errors).length === 0) {
      if (name) {
        onSubmit({
          id: values.id,
          [name]: values[name],
        });
      } else {
        onSubmit(values);
      }
    }
  }

  function getFieldProps(name) {
    const value = values[name];
    return {
      name,
      value,
      handleChange,
      handleDOMChange,
      onBlur: handleBlur,
      onFocus: handleFocus,
    };
  }

  function getFieldMeta(name) {
    const focus = focuses[name];
    const error = errors[name];
    const touched = touches[name];
    return {
      focus,
      error,
      touched,
    };
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    getFieldProps,
    getFieldMeta,
  };
}

export default useForm;
