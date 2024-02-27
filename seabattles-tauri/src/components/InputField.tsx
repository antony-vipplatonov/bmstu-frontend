import { FC } from 'react'
import './InputField.css'

interface Props {
    value: string
    searchvalue: string
    setValue: (value: string) => void
    onEnter: (value: string) => void
}


function enterHandler(key: string, func: any, value: string){
    if (key == "Enter"){
        (document.activeElement as HTMLElement).blur();
        func(value);
    }
}

const InputField: FC<Props> = ({ value, setValue, onEnter}) => (
    
    <input name="text" type="text" className="form-control" placeholder="Поиск"  value={value} onChange={(event => setValue(event.target.value))} onKeyDown={(event => enterHandler(event.key, onEnter, value))} />
)

export default InputField