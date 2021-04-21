import { split } from 'lodash';
import React, {createContext, useReducer, useCallback} from 'react';
import { createGridLines } from '../lib/grid/grid';
import { arrayInterval, newArrayForEach } from '../lib/utils/utils';
import {editorReducer} from '../reducer/editorReducer';
export const EditorContext = createContext(null);

const setup = {
    width: 1000,
    height: 700
}

export const EditorProvider = ({children}) => {
    const initialeState = {
        page: 0,
        previewBoxScale: 1,
        focus: {
            key: '0',
            type: 'page'
        },
        previewBox: {
            scale: 1,
            grid: createGridLines(setup),
            size: {width:setup.width, height:setup.height},
            magnetPow: 3,
            magnetLines: []
        },
        inputSession: {
            activate: false,
            value: '',
        }
    }
    const [editorValue,dispatch] = useReducer(editorReducer, initialeState);

    const changePage = useCallback(
    (page) => {
        dispatch({
            type: "CHANGE_PAGE",
            payload: {
                page
            }
        });
    }, 
    [dispatch])

    const changeFocus = useCallback(
    (type,key) => {
        dispatch({
            type: "CHANGE_FOCUS",
            payload: {
                type,
                key
            }
        });
    }, 
    [dispatch])

    const openInputSession = useCallback(
    (value) => {
        dispatch({
            type: "OPEN_INPUT_SESSION",
            payload: {
                value
            }
        });
    }, 
    [dispatch])

    const closeInputSession = useCallback(
    () => {
        dispatch({
            type: "CLOSE_INPUT_SESSION",
        });
    }, 
    [dispatch])

    const modifyForm = useCallback(
    (value) => {
        dispatch({
            type: "MODIFY_FORM",
            payload: {
                value
            }
        });
    }, 
    [dispatch])
    ////preview box
    const changeMagnetLines = useCallback(
        (magnetLines) => {
            dispatch({
                type: "CHANGE_MAGNET_LINE",
                payload: {
                    magnetLines
                }
            })
        }
    )

    

    const value = {
        changePage,
        changeFocus,
        openInputSession,
        closeInputSession,
        modifyForm,
        changeMagnetLines,
        content: editorValue
    }
    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    )
}
