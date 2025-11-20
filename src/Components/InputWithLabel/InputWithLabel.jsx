import { useState } from 'react';

function InputWithLabel({NameLabel,idInput}){
    const [input, setInput] = useState('')
    return (
        <div className='flex flex-col '>
            <label htmlFor={idInput}>{NameLabel}</label>
            <input
            id={idInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='border w-full rounded active:border-sky-500 focus:outline-1 focus:outline-sky-500 p-1'
            />
        </div>
    )
}
export default InputWithLabel