import React, {useReducer, useCallback, useEffect} from 'react';
import {createContext} from 'react';
import {slideReducer} from '../reducer/slideReducer';
export const SlideContext = createContext();

const initialeState = {
    pages : [
        {
            name: 'Page 0',
            color: '#383737',
            elements: [
                {
                    name: 'Element 1',
                    type: 'text',
                    variables: {
                        value: 'Hydrated element',
                        x: 0,
                        y: 0,
                        size: 50,
                        textAlign: 'center',
                        width: 200,
                        height: 100,
                        letterSpacing: 0,
                        color: 'white',
                        bgColor: '#F8AD9C',
                        paddingColumn: 0,
                        paddingRow: 0,
                    }
                },
                {
                    name: 'Element 2',
                    type: 'text',
                    variables: {
                        value: 'Another element',
                        x: 100,
                        y: 0,
                        size: 80,
                        textAlign: 'center',
                        width: 100,
                        height: 50,
                        letterSpacing: 0,
                        color: '#F8AD9C',
                        bgColor: '',
                        paddingColumn: 0,
                        paddingRow: 0,
                    }
                }
            ]
        }
    ]
}

export const SlideProvider = ({children}) => {
    const [slides,dispatch] = useReducer(slideReducer, initialeState);

    const addPage = useCallback(
    () => {
        dispatch({
            type: "ADD_PAGE"
        });
    }, 
    [dispatch])

    const changePageTitle = useCallback(
        (page, title) => {
            dispatch({
                type: "CHANGE_TITLE_PAGE",
                payload: {
                    page,
                    title
                }
            });
        },
        [dispatch]
    )

    const deletePage = useCallback(
        (page) => {
            dispatch({
                type: "DELETE_PAGE",
                payload: {
                    page
                }
            });
        },
        [dispatch]
    )

    const dupplicatePage = useCallback(
        (page, pageContent) => {
            dispatch({
                type: "DUPPLICATE_PAGE",
                payload: {
                    page,
                    pageContent
                }
            });
        },
        [dispatch]
    )

    const changeElementTitle = useCallback(
        (page,element,title) => {
            dispatch({
                type: "CHANGE_ELEMENT_TITLE",
                payload: {
                    page,
                    element,
                    title
                }
            });
        },
        [dispatch]
    )

    const changeElement = useCallback(
        (page, element, property, value) => {
            dispatch({
                type: 'CHANGE_ELEMENT_PROPERTY',
                payload: {
                    page,
                    element,
                    property,
                    value
                }
            })
        }
    )

    const value = {
        addPage,
        deletePage,
        dupplicatePage,
        changePageTitle,
        changeElementTitle,
        changeElement,
        content: slides
    }


    return (
        <SlideContext.Provider value={value}>
            {children}
        </SlideContext.Provider>
    )
}
