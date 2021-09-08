import {IFormFields} from './form-fields';

export interface IForm {
  name: string;
  title: string;
  fields: IFormFields[];
}
