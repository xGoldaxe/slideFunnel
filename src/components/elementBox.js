import { flatten, flattenDeep } from 'lodash';
import React, {useContext, useState, useEffect, useRef} from 'react'
import { EditorContext } from '../context/editorContext';
import { SlideContext } from '../context/slideContext';
import { hydrateMagnetLines } from '../lib/grid/getMagnetLines';
import testGridMagnet, { getMagnetLines, getPossibleLinesDirection, testSingleLine } from '../lib/testGridManget';
import { generateMagnetRectangleLines, generateRectangleLines } from '../lib/utils/geometry';
import { newArrayForEach } from '../lib/utils/utils';

export default function ElementBox({index, element}) {
    const editor = useContext(EditorContext);
    const slide = useContext(SlideContext);
    const elementRef = useRef()
    const [onResizing, setOnResizing] = useState(false)
    const [onListen, setOnListen] = useState(false)
    const [initCoord, setInitCoord] = useState([{
        mouseX:0, 
        mouseY:0,
        objX:0,
        objY:0
    }])
    const [width, setWidth] = useState(0)
    
    var type = 'element';
    const focus = editor.content.focus.key === index && editor.content.focus.type === type;
    
    var page = editor.content.page;
    var slidePage = slide.content.pages[page];
    var previewBoxScale = editor.content.previewBoxScale;
    let variables = element.variables

    useEffect(() => {
        if(onResizing || onListen) {
            window.addEventListener('mousemove', handleMouseMouve)
            window.addEventListener('mouseup', endResize)
        }
        return ()=>{
            window.removeEventListener('mousemove', handleMouseMouve)
            window.removeEventListener('mouseup', endResize)
        }
      }, [onResizing, onListen])

    function onClick() {
        editor.changeFocus(type,index)
    }

    function onMouseDown(e) {
        onClick()
        setOnListen(true)
        modifyInitCoord(e)
    }

    function modifyInitCoord(e) {
        var page = editor.content.page;
        var top = slide.content.pages[page].elements[index].variables.y;
        var left = slide.content.pages[page].elements[index].variables.x;
        setInitCoord({mouseX: e.pageX,mouseY: e.pageY, objX: left, objY: top})
    }

    function startResize(e,direction) {
        modifyInitCoord(e)
        setWidth(slide.content.pages[page].elements[index].variables.width);
        setOnResizing(direction)
    }



    function handleMouseMouve(e) {
        var {grid,magnetPow} = editor.content.previewBox;
        var otherElements = [...slidePage.elements]

        otherElements.splice(index, 1)
        var elementsGrid = newArrayForEach(otherElements, (element) => {
            var {x,y,width,height} = element.variables
            return generateMagnetRectangleLines({x,y,width,height})
        })
        var grid = [...grid, ...flatten(elementsGrid)]
        
        if(onResizing) {
            var movementX = (e.pageX - initCoord.mouseX) * previewBoxScale;
            // var actualWidthDiff = initCoord.objX + movementX;
            var origin = initCoord.objX;
            if(onResizing === 'right') {
                let modifyPoint = (width + movementX) + origin;
                var newPoint = testSingleLine({grid, magnetPow})(modifyPoint).point;
                slide.changeElement(page , index, 'width', newPoint - origin);
            }
            if(onResizing === 'left') {
                let modifyPoint = origin + movementX;
                var cutPoint = testSingleLine({grid, magnetPow})(modifyPoint).point;
                
                slide.changeElement(page , index, 'x', cutPoint);
                slide.changeElement(page , index, 'width', width + (origin - cutPoint));
            }
        } else if(onListen) {
                var movementX = (e.pageX - initCoord.mouseX) * previewBoxScale;
                var movementY = (e.pageY - initCoord.mouseY) * previewBoxScale;
                var actualCoord = {}
                actualCoord.y = initCoord.objY + movementY;
                actualCoord.x = initCoord.objX + movementX;

                var newObjMovement = testGridMagnet({grid, magnetPow})({
                    x: actualCoord.x,
                    y: actualCoord.y,
                    width: element.variables.width,
                    height: element.variables.height
                })

                editor.changeMagnetLines(hydrateMagnetLines(grid, generateMagnetRectangleLines({
                    x: newObjMovement.x.point,
                    y: newObjMovement.y.point,
                    width: element.variables.width,
                    height: element.variables.height
                })))
                slide.changeElement(page , index, 'y', newObjMovement.y.point);
                slide.changeElement(page , index, 'x', newObjMovement.x.point);
        }
    }

    function endResize() {
        setOnResizing(false)
        setOnListen(false)
        window.removeEventListener('mousemove', handleMouseMouve)
        window.removeEventListener('mouseup', endResize)
        clearMagnetLines()
    }

    function clearMagnetLines() {
        editor.changeMagnetLines([])
    }


    return <div 
    className="selector"
    onClick={onClick}
    onMouseDown={(e) => onMouseDown(e)}
    style={{
        position: 'absolute',
        top: variables.y,
        left: variables.x,
    }}
    >
        {focus && 
            <>
                <div className="selector__frame"
                onMouseUp={endResize}
                >
                    <div 
                    onMouseDown={(e) => startResize(e,'left')}
                    className="selector__frame__left"

                    ></div>
                    <div
                    onMouseDown={(e) => startResize(e,'right')}
                    className="selector__frame__right"
                    ></div>
                </div>
            </>
        }
        {element.type === 'text' && <TextContent ref={elementRef} variables={variables} value={variables.value} key={index}/>}
    </div>
}

///////////////////////////////////////
const TextContent = React.forwardRef(({variables, value}, ref) => {
    return <p 
    ref={ref}
    style={{
        cursor: 'pointer',
        color: variables.color,
        background: variables.bgColor,
        fontSize: `${variables.size/100 * 3}vw`,
        textAlign: variables.textAlign,
        width: `${variables.width}px`,
        height: `${variables.height}px`,
        letterSpacing: `${variables.letterSpacing/10}vw`,
        padding: `${variables.paddingColumn}px ${variables.paddingRow}px`
    }}>
        {value}
    </p>
})