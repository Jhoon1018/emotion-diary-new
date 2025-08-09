import React, { useState } from 'react';
import './EmotionSelect.css';
import { motion, AnimatePresence } from 'framer-motion';
import guideImg from '../assets/emotion-guide.jpg';

const emotions = [
  { id: 'fear', label: '불안', color: '#B0C4DE' },
  { id: 'joy', label: '기쁨', color: '#FFF9B0' },
  { id: 'sadness', label: '슬픔', color: '#A7CBE3' },
  { id: 'anger', label: '분노', color: '#FFB4A2' },
  { id: 'disgust', label: '혐오', color: '#D3C1E5' },
  { id: 'surprise', label: '놀람', color: '#FFD1DC' },
  { id: 'contempt', label: '멸시', color: '#C6DBDA' }
];

function EmotionSelect({ onNext, onList }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [intensity, setIntensity] = useState(5);

  return (
    <div className="emotion-select">
      <button className="guide-button" onClick={() => setIsOpen(true)}>
        📌 참고
      </button>
      <h2>오늘 당신의 감정은 어떤가요?</h2>
      <div className="emotion-buttons">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            style={{
              backgroundColor: selected === emotion.id ? emotion.color : '#fff',
              borderColor: emotion.color,
            }}
            onClick={() => setSelected(emotion.id)}
          >
            {emotion.label}
          </button>
        ))}
      </div>
       <button
        className="next-button"
        onClick={() => onNext({ emotion: selected, intensity })}
        disabled={!selected}
      >
        다음으로 →
      </button>
       <button
        className="list-button"
        onClick={() => onList && onList()}
      >
        📋 일기 목록 보기
      </button>

      <h3>감정 강도 (1: 약함 ~ 10: 매우 강함)</h3>  
      <input
  type="range"
  min="1"
  max="10"
  value={intensity}
  onChange={(e) => setIntensity(Number(e.target.value))}
/>
<p>{intensity} / 10</p>
<AnimatePresence>
        {isOpen && (
          <motion.div
            className="modal-overlay"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <img src={guideImg} alt="감정 선택 가이드" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    
  );
}

export default EmotionSelect;