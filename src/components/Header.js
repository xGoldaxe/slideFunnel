import React from 'react'
import play from '../images/play.svg'
import back from '../images/back.svg'
import forward from '../images/forward.svg'

export default function Header() {
    return (
        <header>
            <img src={play} alt="play"/>
            <img src={back} alt="back"/>
            <img src={forward} alt="forward"/>
        </header>
    )
}
