import './App.css';

import Prompts from './components/Prompts';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Prompts />} />
      </Routes>
    </div>
  );
}

export default App;
