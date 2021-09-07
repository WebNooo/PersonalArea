import React, {ReactElement, useCallback, useEffect, useState} from "react";

interface IForm {
    children: ReactElement | ReactElement[];
    onFinish?: (values: any) => void
    form?: any
}

interface IControl {
    children: ReactElement
    fieldName: string,
    fieldLabel?: string,
    rules?: {}[]
    onBlur?: () => void
    onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void
    field?: IFormField
}

export interface IFormField {
    fieldName: string,
    fieldLabel: string,
    value: any,
    type: any,
    touch: boolean,
    change: boolean,
    rules: any[]
    handleChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void
    handleBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void

}

export interface IFormSubControl {
    Control: React.FC<IControl>
}

type IFormFields = {[key:string]:IFormField}

export const useForm = () => {

    const [form, setForm] = useState<IFormFields>({})

    const setFormFields = useCallback((fields: IFormFields) => {
        setForm(fields)
    }, [])

    const setTouchField = useCallback((fieldName: string) => {
        setForm({...form, [fieldName]:{...form[fieldName], touch: true}})
    }, [form])


    const setValueField = useCallback((fieldName: string, value: any) => {
        setForm({...form, [fieldName]:{...form[fieldName], value, change: true}})
    }, [form])

    const getField = useCallback((fieldName: string) => {
        return form?.[fieldName] ?? {}
    }, [form])

    const getValues = useCallback(() => {
        const data: {[key:string]:any}  = {}
        for (let element of Object.values(form))
            data[element.fieldName] = element.value
        return data
    }, [form])

    console.log(form)

    return {
        setFormFields,
        setTouchField,
        setValueField,
        getField,
        getValues
    }
}

const Form:React.FC<IForm> & IFormSubControl = ({children, onFinish}) => {

    const formHook = useForm()

    //const childrenArray = Array.isArray(children) ? children : [children]

    useEffect(() => {
        const fields:IFormFields = {}
        React.Children.forEach(children, (child :React.ReactElement) => {
            fields[child.props.fieldName] = {
                fieldName: child.props.fieldName,
                fieldLabel: child?.props?.fieldLabel ?? "",
                value: child?.props?.value ?? "",
                type: child,
                touch: false,
                change: false,
                rules: child?.props?.rules ?? [],
            }
        })

        formHook.setFormFields(fields)
    }, [children])

    const handleFinish = useCallback((event) => {
      const values = formHook.getValues()
        onFinish?.(values)
        event.preventDefault()
    }, [formHook, onFinish])

    return <form onSubmit={handleFinish}>{React.Children.map(children, (element:ReactElement) => ({
        ...element, props: {
            ...element.props,
            field: {...formHook.getField(element.props.fieldName),
                handleBlur: (event:React.FocusEvent<HTMLInputElement>) => {
                    formHook.setTouchField(element.props.fieldName)
                },
                handleChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    formHook.setValueField(element.props.fieldName, event?.target.value ?? "")
                }}
        }
    }))}</form>
}

const Control = ({children, field}:IControl) => {

    return <div className="form_field">
        <label className="form_field__label">
            {field?.fieldLabel}
            {{...children, props: {...children.props, field}}}
        </label>
        <div className="form_field__validation"></div>
    </div>
}

Form.Control = Control

export default Form