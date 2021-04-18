import React, {useState, useContext} from 'react';
import PreviewSlide from './workshop/previewSlide';
import WindowWork from './workshop/windowWork';
import PagesManager from './workshop/tools/pagesManager';
import ElementsManager from './workshop/tools/elementsManager';
import DesignManager from './workshop/tools/designManager';
import BlockRouter from './workshop/windowWorkRouted';
import { EditorContext } from '../context/editorContext';
import PageManager from './workshop/tools/PageManager';

export default function Workshop() {
    const {content} = useContext(EditorContext);
    const focus = content.focus;

    return (
        <div className="workshop">
            <WindowWork
                tabs={[
                    {
                        title:'Pages',
                        content: <><PagesManager /><ElementsManager /></>
                    },
                    {
                        title:'Structure',
                        content:<ul>
                                    <li>Title 1</li>
                                    <li>Paragraphe 1</li>
                                </ul>
                    }
                ]}

            />
            <PreviewSlide />
            <BlockRouter
                actualRoute={focus.type}
                routes={[
                    {
                        name: 'element',
                        component: <ElementTabs />
                    },
                    {
                        name: 'page',
                        component: <PageTabs />
                    }
                ]}
                defaultRoute={<WindowWork tabs={[{title:' '}]}></WindowWork>}
            />
        </div>
    )
}

function ElementTabs() {
    return <WindowWork
            tabs={[
                {
                    title:'Design',
                    content: <DesignManager />
                },
                {
                    title:'Animations',
                    content:<ul>
                                <li>Title 1</li>
                                <li>Paragraphe 1</li>
                            </ul>
                }
            ]}
        />
}

function PageTabs() {
    return <WindowWork
            tabs={[
                {
                    title:'Design',
                    content: <PageManager />
                },
                {
                    title:'Animations',
                    content:<ul>
                                <li>Title 1</li>
                                <li>Paragraphe 1</li>
                            </ul>
                }
            ]}
        />
}