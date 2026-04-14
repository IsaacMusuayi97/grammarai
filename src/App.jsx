import { Routes, Route, Navigate } from 'react-router-dom';
import Humanize from './pages/Humanize';
import Summarize from './pages/Summarize';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/humanize" element={<Humanize />} />
        <Route path="/" element={<Navigate to="/humanize" replace />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
