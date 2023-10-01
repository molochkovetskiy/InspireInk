import './App.css';

import Prompts from './components/Prompts';
import PromptDetails from './components/PromptDetails';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/prompts/:id" element={<PromptDetails />} />
      </Routes>
    </div>
  );
}

export default App;
