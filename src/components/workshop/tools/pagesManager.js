import React, {useContext, useState} from 'react';
import { SlideContext } from '../../../context/slideContext';
import { EditorContext } from '../../../context/editorContext';
import { RightClickMenuContext } from '../../../context/rightClickMenuContext';
import plusCross from '../../../images/plusCross.svg'
import { TabPage } from '../Tab';
import TextInput from '../../TextInput';


export default function ElementsManager() {
    const { content: slideContent, addPage } = useContext(SlideContext);
    const editor = useContext(EditorContext);

    return (
        <div className="pagesManager">
            <h3>Pages</h3>
            <ul className="pagesManager__pageList">
                {slideContent.pages.map((page,i) => {
                    return <TabPage
                    key={i} 
                    value={page.name}
                    reference={{
                        index: i,
                        page: i,
                    }}
                    >
                    </TabPage>
                })}
            </ul>
            <button onClick={()=>{addPage()}} className="uiButton">
                <img src={plusCross}></img>
            </button>
        </div>
    )
}

