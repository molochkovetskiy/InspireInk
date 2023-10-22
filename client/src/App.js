import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, createContext } from 'react';
import HomePage from './components/HomePage';
import Prompts from './components/Prompts';
import PromptDetails from './components/PromptDetails';
import AnswerPage from './components/AnswerPage';
import { Auth } from './auth/Auth';

import { Box, Stack, ThemeProvider, createTheme } from '@mui/material'

import Feed from './components/Feed';
import Rightbar from './components/Rightbar';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';

export const AppContext = createContext(null);

function App() {
  const [token, setToken] = useState(null);

  const [mode, setMode] = useState('light');

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  });

  const location = useLocation();
  const showSidebar = location.pathname === '/';
  const signUp = location.pathname === '/register';

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={'background.default'} color={'text.primary'}>
          {showSidebar && (
            <HomePage />
          )}
          {signUp && (
            <SignUp title='Register' />
          )}
          {!showSidebar && !signUp && (
            <>
              <Navbar />
              <Stack direction='row' spacing={2} justifyContent='space-between'>
                <>
                  <Sidebar mode={mode} setMode={setMode} />
                  <Routes>
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/prompts" element={<Auth><Prompts /></Auth>} />
                    <Route path="/answers/:id" element={<Auth><AnswerPage /></Auth>} />
                    <Route path="/prompts/:id" element={<Auth><PromptDetails /></Auth>} />
                  </Routes>
                  <Rightbar />
                </>
              </Stack>
            </>
          )}
        </Box>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
