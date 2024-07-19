import { useState } from 'react';
import './App.css';
import Interface from './sections/Interface';
import Record from './sections/Record';
import Menu from './sections/Menu';
import Terminal from './sections/Terminal';
import KeyboardShortcutHandler from './components/KeyboardShortcutHandler';
import { useGlobal } from './GlobalContextHandler';

function App() {

  const [gameConfig, setGameConfig] = useGlobal().gameConfig;

  return (
    <div className={`app ${gameConfig.colorTheme}`}>
      <KeyboardShortcutHandler />
      <main>
        <Interface />
        <Record />
        <Menu />
        <Terminal />
      </main>
    </div>
  );
}

export default App;
