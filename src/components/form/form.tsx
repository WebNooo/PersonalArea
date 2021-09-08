import React, {ReactElement, useCallback, useEffect, useState} from 'react';

interface IForm {
  children: ReactElement | ReactElement[];
  onFinish?: (values: any) => void;
  form?: any;
}

interface IControl {
  children: ReactElement | ReactElement[];
  name?: string;
  label?: string;
  rules?: {}[];
  onBlur?: () => void;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  field?: IFormField;
}

export type IFieldType = 'text' | 'select' | 'checkbox';

export interface IFormField {
  name: string;
  label: string;
  value: any;
  type?: IFieldType;
  touch: boolean;
  change: boolean;
  rules: any[];
  handleChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  setFieldType?: (type: string) => void;
}

export interface IFormSubControl {
  Control: React.FC<IControl>;
}

type IFormFields = { [key: string]: IFormField };

export const useForm = () => {
  const [form, setForm] = useState<IFormFields>({});

  const setFormFields = useCallback((fields: IFormFields) => {
    setForm(fields);
  }, []);

  const setTouchField = useCallback(
      (fieldName: string) => {
        setForm({...form, [fieldName]: {...form[fieldName], touch: true}});
      },
      [form],
  );

  const setValueField = useCallback(
      (fieldName: string, value: any) => {
        setForm({
          ...form,
          [fieldName]: {...form[fieldName], value, change: true},
        });
      },
      [form],
  );

  const getField = useCallback(
      (fieldName: string) => {
        return form?.[fieldName] ?? {};
      },
      [form],
  );

  const getValues = useCallback(() => {
    const data: { [key: string]: any } = {};
    for (const element of Object.values(form)) {
      data[element.name] = element.value;
    }
    return data;
  }, [form]);

  console.log(form);

  return {
    setFormFields,
    setTouchField,
    setValueField,
    getField,
    getValues,
  };
};

const Form: React.FC<IForm> & IFormSubControl = ({
  children,
  onFinish,
}: IForm) => {
  const formHook = useForm();

  useEffect(() => {
    const fields: IFormFields = {};
    React.Children.forEach(children, (child: React.ReactElement) => {
      if (child.props.name) {
        fields[child.props.name] = {
          name: child.props.name,
          label: child?.props?.label ?? '',
          value: child?.props?.value ?? '',
          touch: false,
          change: false,
          rules: child?.props?.rules ?? [],
        };
      }
    });

    formHook.setFormFields(fields);
  }, [children]);

  const handleFinish = useCallback(
      (event) => {
        onFinish?.(formHook.getValues());
        event.preventDefault();
      },
      [formHook, onFinish],
  );

  return (
    <form onSubmit={handleFinish}>
      {React.Children.map(children, (element: ReactElement) => {
        if (element.props.name) {
          return {
            ...element,
            props: {
              ...element.props,
              field: {
                ...formHook.getField(element.props.name),
                handleBlur: (event: React.FocusEvent<HTMLInputElement>) => {
                  formHook.setTouchField(element.props.name);
                },
                handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                  formHook.setValueField(
                      element.props.name,
                      event?.target.value ?? '',
                  );
                },
                handleClear: () => {
                  formHook.setValueField(element.props.name, '');
                },
              },
            },
          };
        }
        return element;
      })}
    </form>
  );
};

const Control: React.FC<IControl> = ({children, field}) => {
  return (
    <div className="form_field">
      <label className="form_field__label">
        {field?.label}
        {React.Children.map(children, (x: ReactElement) => ({
          ...x,
          props: {...x.props, field},
        }))}
      </label>
      <div className="form_field__validation"></div>
    </div>
  );
};

Form.Control = Control;

export default Form;
