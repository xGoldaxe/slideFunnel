import React, {useContext, useEffect} from 'react';
import Workshop from './components/Workshop';
import Header from './components/Header';
import {EditorContext} from './context/editorContext';


function App() {
  const editor = useContext(EditorContext);


  return (
    <div className="App">
      <Header></Header>
      <Workshop />
    </div>
  );
}

export default App;
