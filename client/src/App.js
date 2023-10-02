import './App.css';

import Prompts from './components/Prompts';
import PromptDetails from './components/PromptDetails';
import LoginRegister from './components/LoginRegister';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/prompts" element={<Prompts />} />
        <Route path="/prompts/:id" element={<PromptDetails />} />
        <Route path='/login' element={<LoginRegister  title='Login'/>} />
        <Route path='/register' element={<LoginRegister  title='Register'/>} />
      </Routes>
    </div>
  );
}

export default App;
