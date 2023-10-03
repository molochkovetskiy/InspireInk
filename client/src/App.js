import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import Prompts from './components/Prompts';
import PromptDetails from './components/PromptDetails';
import LoginRegister from './components/LoginRegister';
import { Auth } from './auth/Auth';

export const AppContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);
  
  return (
    <AppContext.Provider value={{ token, setToken }}>
      <div className="App">
        <Routes>
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/prompts/:id" element={<Auth><PromptDetails /></Auth>} />
          <Route path='/login' element={<LoginRegister title='Login' />} />
          <Route path='/register' element={<LoginRegister title='Register' />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
