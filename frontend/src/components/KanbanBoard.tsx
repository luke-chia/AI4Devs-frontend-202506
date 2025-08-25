import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Container, Row, Card } from 'react-bootstrap'
import PhaseColumn from './PhaseColumn'
import { Candidate } from './CandidateCard'
import './kanban.css'

interface KanbanBoardProps {
  positionTitle: string
  phases: string[]
  initialCandidates: Candidate[]
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  positionTitle,
  phases,
  initialCandidates,
}) => {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)

  const handleCandidateMove = (candidateId: string, newPhase: string) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, currentPhase: newPhase }
          : candidate
      )
    )
  }

  const getCandidatesByPhase = (phase: string) => {
    return candidates.filter((candidate) => candidate.currentPhase === phase)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Container fluid className="py-4" style={{ backgroundColor: '#f5f6fa' }}>
        {/* Header */}
        <Row className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="py-4">
              <div className="text-center">
                <h1 className="display-6 fw-bold text-dark mb-2">
                  {positionTitle}
                </h1>
                <p className="text-muted mb-0">
                  Gestiona el proceso de contratación de candidatos
                </p>
              </div>
            </Card.Body>
          </Card>
        </Row>

        {/* Kanban Board */}
        <Row>
          {phases.map((phase) => (
            <PhaseColumn
              key={phase}
              phase={phase}
              candidates={getCandidatesByPhase(phase)}
              onCandidateMove={handleCandidateMove}
            />
          ))}
        </Row>

        {/* Summary */}
        <Row className="mt-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="py-3">
              <div className="row text-center">
                <div className="col">
                  <h6 className="text-muted mb-1">Total Candidatos</h6>
                  <h4 className="fw-bold text-primary mb-0">
                    {candidates.length}
                  </h4>
                </div>
                {phases.map((phase) => (
                  <div key={phase} className="col">
                    <h6 className="text-muted mb-1">{phase}</h6>
                    <h4 className="fw-bold text-secondary mb-0">
                      {getCandidatesByPhase(phase).length}
                    </h4>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </DndProvider>
  )
}

export default KanbanBoard
