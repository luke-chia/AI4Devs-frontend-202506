import React from 'react'
import { useDrag } from 'react-dnd/dist/hooks'
import { Card } from 'react-bootstrap'

export interface Candidate {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  score: number
  currentPhase: string
}

interface CandidateCardProps {
  candidate: Candidate
  onMove: (candidateId: string, newPhase: string) => void
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'candidate',
    item: { candidateId: candidate.id, currentPhase: candidate.currentPhase },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const renderScoreCircles = (score: number) => {
    const circles = []
    for (let i = 1; i <= 5; i++) {
      circles.push(
        <span
          key={i}
          className={`badge rounded-pill ${
            i <= score ? 'bg-success' : 'bg-light'
          }`}
          style={{
            width: '8px',
            height: '8px',
            margin: '0 1px',
            display: 'inline-block',
          }}
        />
      )
    }
    return circles
  }

  return (
    <Card
      ref={drag}
      className={`mb-3 candidate-card ${isDragging ? 'dragging' : ''}`}
      style={{
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        transition: 'all 0.2s ease',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Card.Body className="p-3">
        <div className="d-flex align-items-center mb-2">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="rounded-circle me-2"
            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
          />
          <div className="flex-grow-1">
            <h6 className="mb-0 fw-semibold" style={{ fontSize: '14px' }}>
              {candidate.name}
            </h6>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center">
          {renderScoreCircles(candidate.score)}
        </div>
      </Card.Body>
    </Card>
  )
}

export default CandidateCard
