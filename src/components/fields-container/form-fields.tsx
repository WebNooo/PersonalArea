import React from 'react';
import {IFormFields} from '../../interfaces';
import {Checkbox, Text, Select} from '../controls';

export const formFields = (field: IFormFields) => {
  switch (field.type) {
    case 'text':
      return <Text />;
    case 'checkbox':
      return <Checkbox {...field} />;
    case 'select':
      return <Select {...field} />;
  }
};
