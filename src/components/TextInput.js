import React, {useState, useRef, useEffect} from 'react'

export default function TextInput({className, value, submitModification, rule = function rule(state) {return state}}) {
    const [state, setState] = useState(value)
    const ref = useRef(null)

    useEffect(() => {
        ref.current.focus()
        ref.current.select()
    }, [])

    function handleChange(e) {
        setState(e.target.value)
    }

    function onFinish(save) {        
        if(save) {
            let result = rule(state)
            submitModification(result)
        } else {
            submitModification(value)
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
        <input 
            className={className}
            value={state}
            onChange={(e)=>handleChange(e)}
            onKeyUp={(e)=>verifyTouch(e)}
            onBlur={() => onFinish(true)}
            ref={ref}
        />
    )
}
