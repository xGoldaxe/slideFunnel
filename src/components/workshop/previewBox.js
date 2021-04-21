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
    const size = editor.content.previewBox.size;
    return (
        <div className="previewBox" 
            style={{
                background: content.pages[page].color,
                display: 'flex',
                justifyContent: 'flex-start'
            }}> 
            <Grid grid={editor.content.previewBox.grid} size={size}/>
            {content.pages[page].elements.map((element,i) => {
                return <ElementBox index={i} element={element}/>
            })}
            <MagnetLines magnetLines={magnetLines} size={size}/>

        </div>
    )
}

function MagnetLines({magnetLines, size}) {
    const {width, height} = size;
    return <svg width={width} height={height} version="1.1" xmlns="http://www.w3.org/2000/svg"
    style={{
        position: 'absolute',
        pointerEvents:'none',
        overflow: 'visible',
        top: 0,
        left: 0,
    }}>
        {magnetLines && magnetLines.map((line) => {
            return <g>
                <circle cx={line[0].x} cy={line[0].y} r={3} fill={'yellow'}/>
                <line x1={line[0].x} x2={line[1].x} y1={line[0].y} y2={line[1].y} stroke="yellow"  strokeWidth="1"/>
                <circle cx={line[1].x} cy={line[1].y} r={3} fill={'yellow'}/>
            </g>
        })}
    </svg>
}