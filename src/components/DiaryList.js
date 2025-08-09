import React, { useEffect, useState } from 'react';
import './DiaryList.css';

const emotions = [
  { id: 'joy', label: '기쁨' },
  { id: 'sadness', label: '슬픔' },
  { id: 'angry', label: '분노' },
  { id: 'fear', label: '불안' },
  { id: 'disgust', label: '혐오' },
  { id: 'surprise', label: '놀람' },
  { id: 'contempt', label: '멸시' },
];

function DiaryList({ onDelete, onEdit, onWrite, onStats, keyword }) {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [edited, setEdited] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("emotionDiary") || "[]");
    if (keyword) {
      // 상황, 반응, 복기에 키워드가 포함되어있는지 확인
      setEntries(saved.filter(
        entry =>
          (entry.situation && entry.situation.includes(keyword)) ||
          (entry.reaction && entry.reaction.includes(keyword)) ||
          (entry.reflection && entry.reflection.includes(keyword))
      ));
    } else {
      setEntries(saved);
    }
  }, [keyword]);

  const handleDelete = (id) => {
    onDelete && onDelete(id);
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
  };

  const handleEditClick = (entry) => {
    setEditingId(entry.id);
    setEdited({ ...entry });
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("emotionDiary") || "[]");
    const updated = saved.map((item) => item.id === edited.id ? {
      ...edited,
      emotionIntensity: Number(edited.emotionIntensity), // 숫자 변환
    } : item);
    localStorage.setItem("emotionDiary", JSON.stringify(updated));
    setEditingId(null);
    setEntries(updated);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="diary-list">
      <h2>📘 나의 감정일기 목록</h2>
      {keyword && (
        <p style={{ color: 'gray' }}>🔍 '{keyword}' 키워드로 필터링 중</p>
      )}
      <div className="top-actions">
        <button className="write-button" onClick={() => onWrite && onWrite()}>
          ✍️ 새 일기 쓰기
        </button>
        <button className="write-button" onClick={() => onStats && onStats()}>
          📊 감정 통계 보기
        </button>
      </div>
      {entries.length === 0 ? (
        <p>저장된 일기가 없습니다.</p>
      ) : (
        entries.map((entry) => (
          <div className="diary-card" key={entry.id}>
            <div className="date">{new Date(entry.id).toLocaleString()}</div>
            {editingId === entry.id ? (
              <>
                <div className="diary-field">
                  <label>감정:</label>
                  <select
                    value={edited.emotion}
                    onChange={(e) => setEdited({ ...edited, emotion: e.target.value })}
                  >
                    {emotions.map((emo) => (
                      <option key={emo.id} value={emo.id}>{emo.label}</option>
                    ))}
                  </select>
                </div>
                <div className="diary-field">
                  <label>강도:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={edited.emotionIntensity}
                    onChange={(e) => setEdited({ ...edited, emotionIntensity: Number(e.target.value) })}
                  />
                </div>
                <div className="diary-field">
                  <label>상황:</label>
                  <textarea
                    value={edited.situation}
                    onChange={(e) => setEdited({ ...edited, situation: e.target.value })}
                  />
                </div>
                <div className="diary-field">
                  <label>반응:</label>
                  <textarea
                    value={edited.reaction}
                    onChange={(e) => setEdited({ ...edited, reaction: e.target.value })}
                  />
                </div>
                <div className="diary-field">
                  <label>복기:</label>
                  <textarea
                    value={edited.reflection}
                    onChange={(e) => setEdited({ ...edited, reflection: e.target.value })}
                  />
                </div>
                <div className="button-group">
                  <button onClick={handleSave}>💾 저장</button>
                  <button onClick={handleCancel}>취소</button>
                </div>
              </>
            ) : (
              <>
                <div><strong>감정:</strong> {entry.emotion} ({entry.emotionIntensity}/10)</div>
                <div><strong>상황:</strong> {entry.situation}</div>
                <div><strong>반응:</strong> {entry.reaction}</div>
                <div><strong>복기:</strong> {entry.reflection}</div>
                <div className="button-group">
                  <button onClick={() => handleDelete(entry.id)}>🗑 삭제</button>
                  <button onClick={() => handleEditClick(entry)}>✏️ 수정</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default DiaryList;
