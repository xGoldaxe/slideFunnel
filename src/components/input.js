import React, {useState} from 'react'

export default function Input({name,type, value, submitModification}) {
    const [state, setState] = useState(value)
    
    function handleChange(e) {
        setState(e.target.value)
    }

    function onFinish(save) {
        if(save) {
            let result = parseInt(state)
            submitModification(type,result)
        } else {
            submitModification(type,value)
        }
    }

    function verifyTouch(e) {
        if (e.key === 'Enter') {
            onFinish(true)
        }
        if (e.key === 'Escape') {
            onFinish(false)
        }
    }

    return (
        <div className="designManager__section__option">
            <div className="designManager__section__option__type">{name}</div>
            <div className="designManager__section__option__value">
                <input
                    size={1}
                    className="designManager__section__option__value"
                    value={state}
                    onChange={(e)=>handleChange(e)}
                    onKeyUp={(e)=>verifyTouch(e)}
                />
            </div>
        </div>
    )
}
