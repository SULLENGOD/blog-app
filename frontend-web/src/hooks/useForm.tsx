import { ChangeEvent, useState } from "react";

interface FormState {
  [key: string]: string;
}

export const useForm = <T extends FormState>(initialForm: T) => {
  const [formState, setFormState] = useState<T>(initialForm);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    handleChange,
    handleReset,
  };
};
