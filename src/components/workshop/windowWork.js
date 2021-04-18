import React, { useState } from 'react';
import Tab from './Tab';

export default function WindowWork({tabs}) {
    const [actualTab, setActualTab] = useState(tabs[0].title)

    function handleTabChange(tab) {
        setActualTab(tab)
    }
    return (
        <div className="windowWork">
            <nav className="windowWork__nav">
                <ul>
                    {tabs.map((tab) => {
                        var title = tab.title;
                        return <li 
                                className={`windowWork__nav__tab ${title === actualTab && "windowWork__nav__tab--focus"}`}
                                onClick={()=>handleTabChange(title)}
                                key={title}>
                                    {title}
                            </li>})}
                </ul>
            </nav>
            {tabs.map((tab) => {
                if(tab.title === actualTab){
                    return tab.content
                }})}
        </div>
    )
}
