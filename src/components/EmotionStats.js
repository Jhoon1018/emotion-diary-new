import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import EmotionWordCloud from '../components/EmotionWordCloud'; // 추가

// ... ChartJS.register 등 생략 (기존 그대로 유지)

function EmotionStats({ onBack }) {
  const [barData, setBarData] = useState(null);
  const [wordCloudData, setWordCloudData] = useState([]); // 추가

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("emotionDiary") || "[]");
    if (!Array.isArray(saved) || saved.length === 0) {
      setBarData(null);
      setWordCloudData([]);
      return;
    }

    // 1. 감정별 평균 강도 계산 (Bar)
    const groupMap = {};
    saved.forEach(entry => {
      const { emotion, emotionIntensity } = entry;
      if (!emotion || typeof emotionIntensity !== 'number') return;
      if (!groupMap[emotion]) {
        groupMap[emotion] = { total: 0, count: 0 };
      }
      groupMap[emotion].total += emotionIntensity;
      groupMap[emotion].count += 1;
    });
    const labels = Object.keys(groupMap);
    const averages = labels.map(emotion =>
      Number((groupMap[emotion].total / groupMap[emotion].count).toFixed(2))
    );
    if (labels.length > 0 && averages.length > 0) {
      setBarData({
        labels,
        datasets: [
          {
            label: '감정별 평균 강도 (1~10)',
            data: averages,
            backgroundColor: '#87cefa',
            borderRadius: 6,
          },
        ],
      });
    } else {
      setBarData(null);
    }

    // 2. 워드클라우드용 데이터 (감정별 등장 횟수 집계)
    // (여기서는 emotion 필드만)
    const wordCount = {};
    saved.forEach(entry => {
      if (entry.emotion) {
        wordCount[entry.emotion] = (wordCount[entry.emotion] || 0) + 1;
      }
    });
    const wcData = Object.entries(wordCount).map(([word, count]) => ({ word, count }));
    setWordCloudData(wcData);

  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Noto Sans KR' }}>
      <h2 style={{ textAlign: 'center' }}>📊 감정별 평균 강도</h2>
      {/* 평균 강도 Bar 차트 */}
      {barData &&
      barData.labels &&
      barData.labels.length > 0 &&
      barData.datasets &&
      barData.datasets.length > 0 &&
      Array.isArray(barData.datasets[0].data) &&
      barData.datasets[0].data.length > 0 ? (
        <Bar
          data={barData}
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                max: 10,
                title: { display: true, text: '강도' },
              },
            },
          }}
        />
      ) : (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          😢 저장된 감정일기가 없어 통계를 만들 수 없어요.
        </p>
      )}

      {/* 워드클라우드 추가 */}
      <div style={{ marginTop: "3rem" }}>
        <h2 style={{ textAlign: "center" }}>☁️ 감정 빈도 워드클라우드</h2>
        {wordCloudData && wordCloudData.length > 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <EmotionWordCloud data={wordCloudData} />
          </div>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>
            😢 저장된 감정일기가 없어 워드클라우드를 만들 수 없어요.
          </p>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: '#f0f0f0',
          }}
        >
          🔙 목록으로
        </button>
      </div>
    </div>
  );
}

export default EmotionStats;
