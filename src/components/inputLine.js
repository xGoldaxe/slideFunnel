import { useState } from "react"
import React from 'react'

export default function InputLine({Input, type, name, value, submitModification, rule}) {
    const [onWriting, setOnWriting] = useState(false)

    function openInput() {
        setOnWriting(true)
    }

    function clopseInput(value) {
        submitModification(type, value)
        setOnWriting(false)
    }

    return (
        <div>
            <div className="designManager__section__option"  onClick={openInput}>
                <div className="designManager__section__option__type">{name}</div>
                <div className="designManager__section__option__value">
                    {onWriting ? 
                        <Input
                            className={"designManager__section__option__value"}
                            value={value} 
                            submitModification={clopseInput}
                            rule={rule}
                        /> : 
                        <p>
                            {value}
                        </p>}
                </div>
            </div>
        </div>
    )
}
