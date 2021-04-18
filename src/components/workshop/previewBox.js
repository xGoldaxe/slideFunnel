import React, {useContext} from 'react';
import { SlideContext } from '../../context/slideContext';
import { EditorContext } from '../../context/editorContext';
import ElementBox from '../elementBox';
import Grid from './grid';

export default function PreviewBox() {
    const slides = useContext(SlideContext);
    const content = slides.content;
    const editor = useContext(EditorContext);
    const page = editor.content.page;

    const magnetLines = editor.content.previewBox.magnetLines;
    return (
        <div className="previewBox" 
            style={{
                background: content.pages[page].color,
                display: 'flex',
                justifyContent: 'flex-start'
            }}> 
            <Grid grid={editor.content.previewBox.grid} size={editor.content.previewBox.size}/>
            {content.pages[page].elements.map((element,i) => {
                return <ElementBox index={i} element={element}/>
            })}
            {magnetLines.x.map((lineX) => {
                return <MagnetLine x={lineX} y={null}/>
            })}
            {magnetLines.y.map((lineY) => {
                return <MagnetLine x={null} y={lineY}/>
            })}
        </div>
    )
}

function MagnetLine({x,y}) {
    return <div className="magnetLine"
        style={{
            left: x!==null ? x : 0,
            top: y!==null ? y : 0,
            height: x!==null ? '100%' : '1px',
            width: y!==null ? '100%' : '1px',
        }}
    >
    </div>
}