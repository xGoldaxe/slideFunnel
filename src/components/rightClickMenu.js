import React, {useContext, useEffect} from 'react'
import ReactDOM from 'react-dom';
import { RightClickMenuContext } from '../context/rightClickMenuContext';



export default function RightClickMenu({x,y}) {
    const { activateMenu, content } = useContext(RightClickMenuContext);
    
    function deleteMenu(e) {
        e.preventDefault();
        activateMenu(false,0,0)
    }
    
    const style = {
        top: content.y,
        left: content.x
    }
    return ReactDOM.createPortal(
    <>
        {content.activate && 
        <div className="rightClickMenu--container" onContextMenu={(e) => deleteMenu(e)} onClick={(e) => deleteMenu(e)}>
            <div className="rightClickMenu" style={style}>
                <ul>
                    {content.tools.map( tool => {
                        return <li onClick={tool.func}>{tool.name}</li>
                    })}
                </ul>
            </div>
        </div>}
    </>
    ,document.getElementById('root') )
}