import { useState } from 'react';
import './App.css';
import Interface from './sections/Interface';
import Record from './sections/Record';
import Menu from './sections/Menu';
import Terminal from './sections/Terminal';
import KeyboardShortcutHandler from './components/KeyboardShortcutHandler';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <KeyboardShortcutHandler />
      <main>
        <Interface />
        <Record />
        <Menu />
        <Terminal />
      </main>
    </>
  );
}

export default App;
