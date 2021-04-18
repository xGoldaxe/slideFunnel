// import { EditorContext } from '../context/editorContext';
import { RightClickMenuContext } from '../context/rightClickMenuContext';
import React, {useContext, useRef, useEffect, useState} from 'react';

export default function useContextMenu(callbacks) {
    const { activateMenu } = useContext(RightClickMenuContext);

    return function(e) {
        e.preventDefault();
        e.stopPropagation();
        activateMenu(true, e.clientX, e.clientY, callbacks);
    }
}