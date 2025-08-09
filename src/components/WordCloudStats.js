import React, { useEffect, useState } from 'react';
import extractNouns from '../utils/extractNouns';

const wordcloudOptions = {
  rotations: 2,
  rotationAngles: [0, 90],
  fontFamily: 'Noto Sans KR',
  fontSizes: [14, 60],
  padding: 2,
};

function buildWordFreq(list, topN = 80) {
  const freq = {};
  list.forEach(word => {
    freq[word] = (freq[word] || 0) + 1;
  });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([text, value]) => ({ text, value }));
}

export default function WordCloudStats({ onWordClick }) {
  const [words, setWords] = useState([]);

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("emotionDiary") || "[]");
  // 방어코드 추가
  saved = Array.isArray(saved) ? saved : [];
    const corpus = saved.flatMap(entry => [
      ...extractNouns(entry.situation),
      ...extractNouns(entry.reaction),
    ]);

    setWords(buildWordFreq(corpus));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Noto Sans KR' }}>
      <h2 style={{ textAlign: 'center' }}>💬 자주 등장한 키워드</h2>

      <div style={{ height: 400 }}>
        {words.length > 0 ? (
          <WordCloud
            words={words}
            options={wordcloudOptions}
            callbacks={{
              onWordClick: word => onWordClick && onWordClick(word.text),
            }}
          />
        ) : (
          <p style={{ textAlign: 'center', color: '#888' }}>
            키워드가 충분하지 않아 워드클라우드를 만들 수 없습니다.
          </p>
        )}
      </div>

      <p style={{ textAlign: 'center', color: '#888', marginTop: '0.5rem' }}>
        (단어를 누르면 해당 키워드를 포함한 일기만 볼 수 있어요)
      </p>
    </div>
  );
}
