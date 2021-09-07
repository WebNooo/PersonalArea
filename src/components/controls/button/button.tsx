import React from "react";

interface IButton{
    type: "primary"
    text: string
}

export const Button:React.FC<IButton> = ({text, type}) => {
    return <button type={"submit"} className={`button ${type}`}>{text}</button>
}