import { useState } from 'react';
import { SectionCard } from './SectionCard';

export function ThisOrThatCard({ questions }) {
  const rounds = questions.slice(0, -1);
  const result = questions[questions.length - 1].result;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const finished = questionIndex >= rounds.length;
  const question = rounds[questionIndex];

  function choose(option) {
    setAnswers((current) => [...current, option]);
    setQuestionIndex((current) => current + 1);
  }

  function restart() {
    setQuestionIndex(0);
    setAnswers([]);
  }

  return (
    <SectionCard title="Ket or Ron?" label="04">
      {finished ? (
        <div className="this-or-that-result">
          <p className="result-mark" aria-hidden="true">&hearts;</p>
          <p className="section-copy">{result}</p>
          <p className="tiny-note">Your picks: {answers.join(' / ')}</p>
          <button className="secondary-button" type="button" onClick={restart}>
            Play again
          </button>
        </div>
      ) : (
        <>
          <p className="game-counter">Round {questionIndex + 1} of {rounds.length}</p>
          <h3 className="game-question">{question.question}</h3>
          <div className="this-or-that-options">
            {question.options.map((option) => (
              <button className="this-or-that-button" key={option} type="button" onClick={() => choose(option)}>
                {option}
              </button>
            ))}
          </div>
          <p className="tiny-note">No wrong answer. Ron just wants to know.</p>
        </>
      )}
    </SectionCard>
  );
}
