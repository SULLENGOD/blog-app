import { ChangeEvent, useState } from "react"

interface FormState {
    [key: string]: string;
}

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState<FormState>(initialForm);

    const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const handleReset = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        handleChange,
        handleReset
    }
}