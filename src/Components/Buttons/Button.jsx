import './Button.css'

function Button({onClick, NameButton,type, style}) {
    return (
        <button className={style} type={type} onClick={onClick}>{NameButton}</button>
    )
}

export default Button;