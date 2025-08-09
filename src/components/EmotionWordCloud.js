import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';
import "chartjs-chart-wordcloud";

// Chart.js 기본 요소와 플러그인 컨트롤러/엘리먼트 모두 등록
Chart.register(...registerables, WordCloudController, WordElement);

export default function EmotionWordCloud({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const chartData = {
      labels: data.map(d => d.word),
      datasets: [{
        label: 'Word Cloud',
        data: data.map(d => d.count)
      }]
    };

    const chartConfig = {
      type: 'wordCloud',
      data: chartData,
      options: {
        plugins: {
          legend: { display: false }
        },
        minRotation: 0,
        maxRotation: 0,
        rotationSteps: 2,
        fontFamily: 'Noto Sans KR, Arial, sans-serif',
        color: 'random-dark'
      }
    };

    const ctx = canvasRef.current.getContext("2d");
    const chart = new Chart(ctx, chartConfig);

    return () => chart.destroy(); // 언마운트시 파괴 (메모리 누수/충돌 방지)
  }, [data]);

  return <canvas ref={canvasRef} width={400} height={300}></canvas>;
}
