import React, {useCallback} from "react";
import {IFormField} from "../../form/form";

interface ITextControl {
    onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void,
    onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void,
    field?: IFormField,
    password?: boolean
}

const Text = ({
                  onBlur,
                  onChange,
                  field,
                  password
              }: ITextControl) => {

    const handleChange = useCallback((event?: React.ChangeEvent<HTMLInputElement>) => {
        field?.handleChange?.(event)
        onChange?.(event);
    }, [field, onChange])

    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        field?.handleBlur?.()
        onBlur?.(event)
    }, [field, onBlur])

    return <input
        type={password ? "password" : "input"}
        className="form_field__control"
        style={field?.change ? {border: "1px solid red"} : {}}
        value={field?.value ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
    />

}

export default Text