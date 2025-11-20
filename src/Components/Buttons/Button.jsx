import './Button.css'

function Button({onClick, NameButton}) {
    return (
        <button className="border border-green-300 w-max  text-green-300 p-2 rounded hover:bg-green-300 hover:text-white" onClick={onClick}>{NameButton}</button>
    )
}

export default Button;