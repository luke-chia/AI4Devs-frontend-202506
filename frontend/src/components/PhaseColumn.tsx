import React from 'react';
import { useDrop } from 'react-dnd';
import { Col, Card } from 'react-bootstrap';
import CandidateCard, { Candidate } from './CandidateCard';

interface PhaseColumnProps {
  phase: string;
  candidates: Candidate[];
  onCandidateMove: (candidateId: string, newPhase: string) => void;
}

const PhaseColumn: React.FC<PhaseColumnProps> = ({ phase, candidates, onCandidateMove }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'candidate',
    drop: (item: { candidateId: string; currentPhase: string }) => {
      if (item.currentPhase !== phase) {
        onCandidateMove(item.candidateId, phase);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Col md={3} className="mb-4">
      <Card
        ref={drop}
        className={`h-100 phase-column ${isOver ? 'drop-zone-active' : ''}`}
        style={{
          minHeight: '500px',
          backgroundColor: isOver ? '#f8f9fa' : '#ffffff',
          border: isOver ? '2px dashed #007bff' : '1px solid #e0e0e0',
          borderRadius: '12px',
          transition: 'all 0.2s ease'
        }}
      >
        <Card.Header 
          className="text-center py-3"
          style={{ 
            backgroundColor: '#f8f9fa',
            borderBottom: '1px solid #e0e0e0',
            borderRadius: '12px 12px 0 0'
          }}
        >
          <h5 className="mb-0 fw-bold text-dark" style={{ fontSize: '16px' }}>
            {phase}
          </h5>
          <small className="text-muted">
            {candidates.length} candidato{candidates.length !== 1 ? 's' : ''}
          </small>
        </Card.Header>
        <Card.Body className="p-3">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onMove={onCandidateMove}
            />
          ))}
          {candidates.length === 0 && (
            <div 
              className="text-center text-muted py-5"
              style={{ fontSize: '14px' }}
            >
              Arrastra candidatos aquí
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PhaseColumn;