import { useCallback, useMemo, useState } from 'react';
import { AuthProvider } from './context/authProvider/AuthProvider';
import './App.css'
import Root from './pages/root'

function App() {

  return (
    <AuthProvider>
    <Root />
    </AuthProvider>
   
  )
}

export default App
