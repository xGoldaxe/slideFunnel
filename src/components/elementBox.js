import React, {useContext, useState, useEffect, useRef} from 'react'
import { EditorContext } from '../context/editorContext';
import { SlideContext } from '../context/slideContext';
import testGridMagnet, { getMagnetLines } from '../lib/testGridManget';

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
        var top = slide.content.pages[page].elements[index].variables.top;
        var left = slide.content.pages[page].elements[index].variables.left;
        setInitCoord({mouseX: e.pageX,mouseY: e.pageY, objX: left, objY: top})
    }

    function startResize(e,direction) {
        modifyInitCoord(e)
        setWidth(slide.content.pages[page].elements[index].variables.width);
        setOnResizing(direction)
    }



    function handleMouseMouve(e) {
        if(onResizing) {
            var movementX = (e.pageX - initCoord.mouseX) * previewBoxScale;
            // var actualWidthDiff = initCoord.objX + movementX;

            
            var movement
            if(onResizing === 'right') {
                movement = movementX;
            }
            if(onResizing === 'left') {
                movement = -movementX;
                slide.changeElement(page , index, 'left', initCoord.objX + -movement);
            }
            slide.changeElement(page , index, 'width', width + movement);
        } else if(onListen) {
                var movementX = (e.pageX - initCoord.mouseX) * previewBoxScale;
                var movementY = (e.pageY - initCoord.mouseY) * previewBoxScale;
                var actualCoord = {}
                actualCoord.y = initCoord.objY + movementY;
                actualCoord.x = initCoord.objX + movementX;

                let {grid,magnetPow} = editor.content.previewBox
                var newObjMovement = testGridMagnet({grid, magnetPow})({
                    x: actualCoord.x,
                    y: actualCoord.y,
                    width: element.variables.width,
                    height: elementRef.current.offsetHeight
                })
                //its mean that height for p is only known in the frontend, maybe try to find a function to know it with the police, the font size, the padding, the font height, ect..
                //magnetlines
                var magnetLines = {x: newObjMovement.x.magnetLine ? [...newObjMovement.x.magnetLine] : [],
                    y: newObjMovement.y.magnetLine ? [...newObjMovement.y.magnetLine] : []
                }
                editor.changeMagnetLines(magnetLines)
                //
                slide.changeElement(page , index, 'top', newObjMovement.y.point);
                slide.changeElement(page , index, 'left', newObjMovement.x.point);
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
        top: variables.top,
        left: variables.left,
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
        lineHeight: `${variables.fontHeight}%`,
        letterSpacing: `${variables.letterSpacing/10}vw`,
        padding: `${variables.paddingColumn}px ${variables.paddingRow}px`
    }}>
        {value}
    </p>
})