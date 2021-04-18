import React from 'react'
import Input from '../../input'

export default function PageManager() {
    return (
        <div className="designManager">
            <Input
                type={'BG COLOR'}
                onChange={()=>{}}
                value={'red'}
            />
            <Input
                type={'TEXT ALIGNEMENT'}
                onChange={()=>{}}
                value={'center'}
            />
        </div>
    )
}
