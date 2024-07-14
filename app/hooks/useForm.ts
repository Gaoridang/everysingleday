import { useEffect, useState } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import * as Yup from "yup";

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema: Yup.ObjectSchema<any>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (name: keyof T, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const handleBlur = async (name: keyof T) => {
    try {
      await validationSchema.validateAt(name as string, values);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: Partial<Record<keyof T, string>> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            newErrors[err.path as keyof T] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
  };
};
