import React, {useContext} from 'react';
import { EditorContext } from '../context/editorContext';

export function useGetFocus() {
    const {content} = useContext(EditorContext);
    return content.focus
}