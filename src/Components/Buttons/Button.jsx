import './Button.css'

function Button({onClick, NameButton}) {
    return (
        <button className="customButton" onClick={onClick}>{NameButton}</button>
    )
}

export default Button;