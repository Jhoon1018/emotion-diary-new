import React, { useState } from 'react';
import './ReflectionInput.css';

function ReflectionInput({ emotion, situation, reaction, onSubmit, onBack }) {
  const [reflection, setReflection] = useState('');

  const handleSubmit = () => {
    if (reflection.trim()) {
      onSubmit && onSubmit(reflection);
    }
  };

  return (
    <div className="reflection-input">
      <h2>지금 돌아보면, 어떻게 반응했으면 더 좋았을까요?</h2>
      
      <div className="context">
        <p><strong>감정:</strong> {emotion}</p>
        <p><strong>상황:</strong> {situation}</p>
        <p><strong>당시 반응:</strong> {reaction}</p>
      </div>

      <textarea
        placeholder="다음엔 어떤 마음가짐이나 행동이 나에게 더 도움이 되었을까요?"
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
      />
<div className="button-group">
  <button onClick={onBack}>← 이전으로</button>
  <button onClick={handleSubmit} disabled={!reflection}>기록 완료</button>
</div>
    </div>
  );
}

export default ReflectionInput;