import React from "react";

interface ButtonProps {
    text: string;
    onClickHandler: any;
    variation: string;
}

const Button = ({text, onClickHandler} : ButtonProps) => {
    
    return (
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-sm" onClick={onClickHandler}>{text}</button>
    )
}

Button.defaultProps = {
    variation: 'primary'
}

export default Button;