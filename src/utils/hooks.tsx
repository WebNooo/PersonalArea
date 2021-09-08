import {IFormField} from '../components/form/form';
import React, {useCallback} from 'react';

export const useFormField = (
    field: IFormField | undefined,
    onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void,
    onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void,
) => {
  const handleFieldChange = useCallback(
      (event?: React.ChangeEvent<HTMLInputElement>) => {
        field?.handleChange?.(event);
        onChange?.(event);
      },
      [field, onChange],
  );

  const handleFieldBlur = useCallback(
      (event?: React.FocusEvent<HTMLInputElement>) => {
        field?.handleBlur?.();
        onBlur?.(event);
      },
      [field, onBlur],
  );

  return {
    handleFieldChange,
    handleFieldBlur,
  };
};
