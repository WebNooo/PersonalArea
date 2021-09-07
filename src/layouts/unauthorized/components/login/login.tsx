import {Form} from "../../../../components";
import {Button, Text} from "../../../../components/controls";
import {useCallback} from "react";

export const Login = () => {

    const handleFinish = useCallback((values:any) => {
        console.log(values)
    }, [])

    return <div className="container">
        <header className="container__header">
            <h1>Авторизация</h1>
            <p>У вас нет учетной записи? <a href={"/registration"}>Зарегистрироваться</a></p>
        </header>
        {/*<FieldsContainer config={LOGIN} />*/}


        <Form onFinish={handleFinish}>
            <Form.Control fieldName="Username" fieldLabel={"Username"} rules={[{test:"11"}]}>
                <Text />
            </Form.Control>
            <Form.Control fieldName="Password" fieldLabel={"Password"} rules={[{test:"11"}]}>
                <Text password />
            </Form.Control>
            <Form.Control fieldName="Send">
                <Button type={"primary"} text={"Go"} />
            </Form.Control>
        </Form>
    </div>
}