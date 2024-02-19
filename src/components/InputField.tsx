import { FC } from 'react'
import './InputField.css'

interface Props {
    value: string
    searchvalue: string
    setValue: (value: string) => void
    onEnter: (value: string) => void
    placeHolder: string
    error: boolean
}


function enterHandler(key: string, func: any, value: string){
    if (key == "Enter"){
        (document.activeElement as HTMLElement).blur();
        func(value);
    }
}

const InputField: FC<Props> = ({ placeHolder, value, setValue, onEnter, error=false}) => (
    
    <input name="text" type="text" className={`form-control ${error?"error":''}`} placeholder={placeHolder}  value={value} onChange={(event => setValue(event.target.value))} onKeyDown={(event => enterHandler(event.key, onEnter, value))} />
)

export default InputField