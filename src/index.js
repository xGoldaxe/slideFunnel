import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/main.scss';
import  {SlideProvider} from './context/slideContext'
import  {EditorProvider} from './context/editorContext'
import { RightClickMenuProvider } from './context/rightClickMenuContext';
import RightClickMenu from './components/rightClickMenu';

ReactDOM.render(
  <RightClickMenuProvider>
    <SlideProvider>
      <EditorProvider>
        <React.StrictMode>
            <App />
            <RightClickMenu />
        </React.StrictMode>
      </EditorProvider>
    </SlideProvider>
  </RightClickMenuProvider>
  ,
  document.getElementById('root')
);
