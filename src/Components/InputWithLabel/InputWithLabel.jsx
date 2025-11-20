import { useState } from 'react';

function InputWithLabel({NameLabel,idInput, style}){
    const [input, setInput] = useState('')
    return (
        <div className='flex flex-col '>
            <label htmlFor={idInput}>{NameLabel}</label>
            <input
            id={idInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style}
            />
        </div>
    )
}
export default InputWithLabel