import {IForm} from "../../interfaces";
import {required2} from "../validation";

export const LOGIN: IForm = {
    name: "login",
    title: "Авторизация",
    fields: [
        {
            fieldName: "username",
            fieldLabel: "Username",
            placeholder: "Введите email",
            type: "text",
            validation: [{required: true, message: "test"}]
        },
        {
            fieldName: "password",
            fieldLabel: "Password",
            placeholder: "Введите пароль",
            type: "text",
            validation: []
        }
    ]
}