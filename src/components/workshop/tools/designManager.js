import React, {useContext} from 'react'
import Input from '../../input'
import { SlideContext } from '../../../context/slideContext';
import { EditorContext } from '../../../context/editorContext';
import InputLine from '../../inputLine';
import TextInput from '../../TextInput';
import { numberFormVerif, textFormVerif } from '../../../lib/formVerification';


export default function DesignManager() {
    const slide = useContext(SlideContext);
    const editor = useContext(EditorContext);

    const page = editor.content.page;
    const element = editor.content.focus.key;
    const pageElements = slide.content.pages[page].elements[element];
    const variables = pageElements.variables;

    function submitModification(property, value) {
        slide.changeElement(page, element, property, value)
    }

    return (
        <div className="designManager">
            <div className="designManager__section">
                <InputLine
                    name={'CONTENT'}
                    type={'value'}
                    value={variables.value}
                    submitModification={submitModification}
                    rule={textFormVerif}
                    Input={TextInput}
                />
            </div>

            <div className="designManager__section">
                <div className="designManager__section__option">
                    <p className="designManager__section__option__type">TEXT ALIGNEMENT</p>
                    <p className="designManager__section__option__value">CENTER</p>
                </div>
                <InputLine
                    name={'TEXT SCALE'}
                    type={'size'}
                    value={variables.size}
                    submitModification={submitModification}
                    rule={numberFormVerif}
                    Input={TextInput}
                />
                <InputLine
                    name={'MAX WIDTH'}
                    type={'width'}
                    value={variables.width}
                    submitModification={submitModification}
                    rule={numberFormVerif}
                    Input={TextInput}
                />
                <InputLine
                    name={'TEXT HEIGHT'}
                    type={'fontHeight'}
                    value={variables.fontHeight}
                    submitModification={submitModification}
                    rule={numberFormVerif}
                    Input={TextInput}
                />
                <InputLine
                    name={'LETTER SPACING'}
                    type={'letterSpacing'}
                    value={variables.letterSpacing}
                    submitModification={submitModification}
                    rule={numberFormVerif}
                    Input={TextInput}
                />
            </div>

            <div className="designManager__section">
                <Input
                    name={'TEXT COLOR'}
                    submitModification={submitModification}
                    value={50}
                />
                <Input
                    name={'BG COLOR'}
                    submitModification={submitModification}
                    value={50}
                />
                <InputLine
                    name={'PADDING COLUMN'}
                    type={'paddingColumn'}
                    value={variables.paddingColumn}
                    submitModification={submitModification}
                    rule={numberFormVerif}
                    Input={TextInput}
                />
                <InputLine
                    name={'PADDING ROW'}
                    type={'paddingRow'}
                    value={variables.paddingRow}
                    submitModification={submitModification}
                    rule={numberFormVerif}
                    Input={TextInput}
                />
            </div>

            <div className="designManager__section">
                <div className="designManager__section__option">
                    <p className="designManager__section__option__type">SHADOW</p>
                    <p className="designManager__section__option__value">X</p>
                </div>
                <div className="designManager__section__option">
                    <p className="designManager__section__option__type">BORDER</p>
                    <p className="designManager__section__option__value">X</p>
                </div>
                <div className="designManager__section__option">
                    <p className="designManager__section__option__type">LINK</p>
                    <p className="designManager__section__option__value">X</p>
                </div>
            </div>
        </div>
    )
}
