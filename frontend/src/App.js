import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RecruiterDashboard from './components/RecruiterDashboard'
import AddCandidate from './components/AddCandidateForm'
import Positions from './components/Positions'
import PositionDashboard from './components/PositionDashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecruiterDashboard />} />
        <Route path="/add-candidate" element={<AddCandidate />} />{' '}
        {/* Agrega esta línea */}
        <Route path="/positions" element={<Positions />} />
        <Route path="/positionDashboard" element={<PositionDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
