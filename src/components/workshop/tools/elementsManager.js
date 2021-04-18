import React, {useContext, useState} from 'react';
import { SlideContext } from '../../../context/slideContext';
import { EditorContext } from '../../../context/editorContext';
import { RightClickMenuContext } from '../../../context/rightClickMenuContext';
import plusCross from '../../../images/plusCross.svg'
import {TabElement} from '../Tab';
import TextInput from '../../TextInput';

export default function ElementsManager() {
    const { content: slideContent } = useContext(SlideContext);
    const editor = useContext(EditorContext);
    const page = editor.content.page


    return (
        <div className="pagesManager">
            <h3>Elements</h3>
            <ul className="pagesManager__pageList">
                {slideContent.pages[page].elements.map((element,i) => {
                        return <TabElement
                        key={i} 
                        value={element.name}
                        reference={{
                            index: i,
                            page: page,
                        }}/>
                })}
            </ul>
            <button className="uiButton">
                <img src={plusCross}></img>
            </button>
        </div>
    )
}

