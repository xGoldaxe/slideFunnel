import React, {useContext, useRef, useEffect, useState} from 'react';
import { SlideContext } from '../../context/slideContext';
import { EditorContext } from '../../context/editorContext';
import checkMark from '../../images/checkMark.svg'
import useContextMenu from '../../lib/generateMenu';
import TextInput from '../TextInput';

export function TabPage({reference, value}) {
    const slide = useContext(SlideContext);
    const editor = useContext(EditorContext);

    const { index, page } = reference;
    const type= 'page';

    const focus = editor.content.focus.key === index && editor.content.focus.type === type;
    const [onWriting, setOnWriting] = useState(false)

    const generateMenu = useContextMenu([
        {
            name: 'Rename page',
            func: function renamePage() {
                openInput()
            }
        },
        {
            name: 'Delete page',
            func: function deletePage() {
                    var actualPage = editor.content.page;
                    var maxPage = slide.content.pages.length-1;
                    if((page === actualPage || actualPage === maxPage) && (maxPage > 0 && actualPage > 0)) {
                        editor.changePage(actualPage-1)
                    }
                    if(maxPage > 0) {
                        slide.deletePage(page);
                    }
                }
        },
        {
            name: 'Dupplicate page',
            func: function dupplicatePage() {
                    slide.dupplicatePage(page, slide.content.pages[page]);
                }
        },
    ])

    function submitModification(value) {
        setOnWriting(false)
        slide.changePageTitle(page, value);
    }

    function onClick() {
        editor.changePage(index)
        editor.changeFocus(type,index)
    }

    function openInput() {
        onClick()
        setOnWriting(true)
    }

    return <li 
        className={`horizontalTab pageTab ${focus && 'horizontalTab--focus'}`}
        onContextMenu={(e)=>generateMenu(e, {page})}
        onClick={onClick}
        onContextMenu={(e)=>generateMenu(e, {page})}
        onDoubleClick={openInput}
    >
        {editor.content.page == page && 
        <div className="pageTab__selectBox">
            <img src={checkMark} alt='' />
        </div>}
        {onWriting ? <TextInput value={value} submitModification={submitModification} />
        :<p>{value}</p>}
    </li>
}

export function TabElement({reference, value}) {
    const slide = useContext(SlideContext);
    const editor = useContext(EditorContext);

    const { index, page } = reference;
    const type= 'element';

    const focus = editor.content.focus.key === index && editor.content.focus.type === type;
    const [onWriting, setOnWriting] = useState(false)

    const generateMenu = useContextMenu([
        {
            name: 'Rename element',
            func: ()=>{console.log('Rename page')}
        },
        {
            name: 'Delete element',
            func: ()=>{console.log('Delete page')}
        },
        {
            name: 'Rename element',
            func: ()=>{console.log('Rename page')}
        },
    ])

    function submitModification(value) {
        setOnWriting(false)
        if(type==='element') {
            slide.changeElementTitle(page, index, value)
        }
        if(type==='page') {
            slide.changePageTitle(page, value);
        }
    }

    function changeFocus() {
        editor.changeFocus(type,index)
    }

    function openInput() {
        setOnWriting(true)
    }

    return <li 
        className={`horizontalTab pageTab ${focus && 'horizontalTab--focus'}`}
        onContextMenu={(e)=>generateMenu(e, {page})}
        onClick={changeFocus}
        onContextMenu={(e)=>generateMenu(e, {page})}
        onDoubleClick={openInput}
    >
        {onWriting ? <TextInput value={value} submitModification={submitModification} />
        :<p>{value}</p>}
    </li>
}