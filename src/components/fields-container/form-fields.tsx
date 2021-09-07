import {IFormFields} from "../../interfaces";
import {Checkbox, Text, Select} from "../controls";

export const FormFields = (field:IFormFields) => {
    switch (field.type) {
        case "text":
            return <Text />
        case "checkbox":
            return <Checkbox {...field} />
        case "select":
            return <Select {...field} />

    }
}