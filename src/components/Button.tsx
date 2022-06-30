import React from "react";

interface ButtonProps {
    text: string;
    onClickHandler: any;
    variation: string;
    className: string;
    disabled?: any;
}

const Button = ({text, onClickHandler, className, disabled} : ButtonProps) => {
    
    return (
        <button disabled={disabled} className={`bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-sm ${className} ${disabled ? 'disabled bg-sky-100 hover:bg-sky-100 cursor-not-allowed' : ''}`} onClick={onClickHandler}>{text}</button>
    )
}

Button.defaultProps = {
    variation: 'primary',
    className: '',
    disabled: false
}

export default Button;