import React from 'react'
import { useLocation } from 'react-router-dom'
import KanbanBoard from '../components/KanbanBoard'
import { Candidate } from '../components/CandidateCard'

// Import avatars
import avatarJohn from '../assets/avatar-john.jpg'
import avatarJane from '../assets/avatar-jane.jpg'
import avatarBob from '../assets/avatar-bob.jpg'
import avatarEva from '../assets/avatar-eva.jpg'
import avatarAlice from '../assets/avatar-alice.jpg'

const PositionDashboard = () => {
  const location = useLocation()
  const position = location.state?.position

  // Sample data matching the reference image
  const phases = [
    'Llamada telefónica',
    'Entrevista técnica',
    'Entrevista cultural',
    'Entrevista manager',
  ]

  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: avatarJohn,
      email: 'john.doe@example.com',
      phone: '+1-555-0101',
      score: 3,
      currentPhase: 'Llamada telefónica',
    },
    {
      id: '2',
      name: 'Alice Johnson',
      avatar: avatarAlice,
      email: 'alice.johnson@example.com',
      phone: '+1-555-0102',
      score: 4,
      currentPhase: 'Llamada telefónica',
    },
    {
      id: '3',
      name: 'Jane Smith',
      avatar: avatarJane,
      email: 'jane.smith@example.com',
      phone: '+1-555-0103',
      score: 3,
      currentPhase: 'Entrevista técnica',
    },
    {
      id: '4',
      name: 'Bob Brown',
      avatar: avatarBob,
      email: 'bob.brown@example.com',
      phone: '+1-555-0104',
      score: 2,
      currentPhase: 'Entrevista cultural',
    },
    {
      id: '5',
      name: 'Eva White',
      avatar: avatarEva,
      email: 'eva.white@example.com',
      phone: '+1-555-0105',
      score: 5,
      currentPhase: 'Entrevista manager',
    },
  ]

  return (
    <KanbanBoard
      positionTitle={position?.title || 'Posición no encontrada'}
      phases={phases}
      initialCandidates={candidates}
    />
  )
}

export default PositionDashboard
