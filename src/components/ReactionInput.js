import React, { useState } from 'react';
import './ReactionInput.css';

const exampleReactions = [
  '사람들의 시선을 피했다',
  '내가 재미없는 사람일까 걱정했다',
  '아무 말도 하지 않고 상황을 넘겼다',
  '속으로 비판적인 생각이 들었다',
  '마음을 표현하지 못하고 눌러두었다',
];

function ReactionInput({ emotion, situation, onNext, onBack }) {
  const [reaction, setReaction] = useState('');

  const handleNext = () => {
    if (reaction.trim()) {
      onNext && onNext(reaction);
    }
  };

  return (
    <div className="reaction-input">
      <h2>그때 당신은 어떻게 반응했나요?</h2>
      <p className="context">감정: <strong>{emotion}</strong> / 상황: <em>{situation}</em></p>

      <div className="examples">
        {exampleReactions.map((item, index) => (
          <button key={index} onClick={() => setReaction(item)}>
            {item}
          </button>
        ))}
      </div>

      <textarea
        placeholder="당시 내가 한 말, 행동, 떠오른 생각 등을 자유롭게 적어보세요"
        value={reaction}
        onChange={(e) => setReaction(e.target.value)}
      />
      
<div className="button-group">
  <button onClick={onBack}>← 이전으로</button>
  <button onClick={handleNext} disabled={!reaction}>다음으로 →</button>
</div>

      
    </div>
  );
}

export default ReactionInput;