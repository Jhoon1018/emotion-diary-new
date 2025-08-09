import React, { useState } from 'react';
import './SituationInput.css';

const examples = [
  '혼자 길을 걸어갈 때',
  '대화 중 대화가 끊겼을 때',
  '주변에서 시선이 느껴질 때',
  '생일을 축하받을 때',
  '기다리던 연락이 왔을 때',
];

function SituationInput({ emotion, onNext, onBack }) {
  const [situation, setSituation] = useState('');

  const handleNext = () => {
    if (situation.trim()) {
      onNext && onNext(situation);
    }
  };

  return (
    <div className="situation-input">
      <h2>{emotion ? `‘${emotion}’ 감정을 느낀 상황은?` : '상황을 적어주세요'}</h2>

      <div className="examples">
        {examples.map((item, index) => (
          <button key={index} onClick={() => setSituation(item)}>
            {item}
          </button>
        ))}
      </div>

      <textarea
        placeholder="예: 사람들과 대화를 나누던 중 갑자기 조용해졌어요..."
        value={typeof situation === 'string' ? situation : ''}
        onChange={(e) => setSituation(e.target.value)}
      />

      <div className="button-group">
  <button onClick={onBack}>← 이전으로</button>
  <button onClick={handleNext} disabled={!onNext}>다음으로 →</button>
</div>
    </div>
  );
}

export default SituationInput;