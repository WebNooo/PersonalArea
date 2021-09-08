import React, {useCallback, useState} from 'react';
import {IFormField} from '../../form/form';
import classNames from 'classnames';
import {useFormField} from '../../../utils';

interface ITextControl {
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  field?: IFormField;
  password?: boolean;
  clear?: boolean;
}

const Text = ({onBlur, onChange, field, password, clear}: ITextControl) => {
  const {handleFieldChange, handleFieldBlur} = useFormField(
      field,
      onBlur,
      onChange,
  );
  const [hover, setHover] = useState(false);

  const toggleHover = useCallback(() => {
    setHover(!hover);
  }, [hover]);

  return (
    <div className={classNames('form_field__control')}>
      <input
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        type={password ? 'password' : 'input'}
        className=""
        value={field?.value ?? ''}
        onChange={handleFieldChange}
        onBlur={handleFieldBlur}
      />
    </div>
  );
};

export default Text;
