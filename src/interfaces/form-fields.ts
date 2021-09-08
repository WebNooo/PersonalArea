export interface IFormFields {
  fieldName: string;
  fieldLabel: string;
  type: 'text' | 'checkbox' | 'select';
  placeholder?: string;
  validation: {}[];
  readonly?: boolean;
  disable?: boolean;
}
