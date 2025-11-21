

function InputWithLabel({NameLabel,idInput, typeInput, value, onChange, style}){

    return (
        <div className='flex flex-col '>
            <label htmlFor={idInput}>{NameLabel}</label>
            <input
            id={idInput}
            type={typeInput}
            name={idInput}
            value={value}
            onChange={onChange}
            className={style}
            />
        </div>
    )
}
export default InputWithLabel