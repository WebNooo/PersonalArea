import React from "react";
import {IForm} from "../../interfaces";
import {FormFields} from "./form-fields";
import {Button} from "../controls";

interface IFieldsContainer{
    config: IForm
}

export const FieldsContainer:React.FC<IFieldsContainer> = ({config}) => {
    return <form className="form">
        {config.fields.map(x => <div key={`${config.name}_${x.fieldName}`} className="form_field">{FormFields(x)}</div>)}
        <Button text="Сохранить" type="primary" />
    </form>
}