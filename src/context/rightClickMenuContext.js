import React, {createContext, useReducer, useCallback} from 'react';
import {rightClickMenuReducer} from '../reducer/rightClickMenuReducer';
export const RightClickMenuContext = createContext(null);

export const RightClickMenuProvider = ({children}) => {
    const initialeState = {
        tools: [],
        activate: false,
        x: 0,
        y: 0
    }
    const [menuValue,dispatch] = useReducer(rightClickMenuReducer, initialeState);

    const activateMenu = useCallback(
    (direction,x,y,tools) => {
        dispatch({
            type: "ACTIVATE_MENU",
            payload: {
                direction,
                x,
                y,
                tools
            }
        });
    }, 
    [dispatch])

    const value = {
        activateMenu,
        content: menuValue,
    }
    return (
        <RightClickMenuContext.Provider value={value}>
            {children}
        </RightClickMenuContext.Provider>
    )
}
