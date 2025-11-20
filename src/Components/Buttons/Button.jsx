import './Button.css'

function Button({onClick, NameButton, style}) {
    return (
        <button className={style} onClick={onClick}>{NameButton}</button>
    )
}

export default Button;