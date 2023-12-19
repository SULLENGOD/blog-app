import { useState } from 'react'

export const useForm = ( initialForm = {}) => {

  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (name, value) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    resetForm
  };
};