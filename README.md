# Emotion Diary 🫥
매일 반복되는 감정의 홍수 속에서, 나를 놓치지 않고 기록하고 싶어 만든 앱입니다.
감정이 생긴 상황과 나의 반응을 적어두고, 나중에 다시 돌아보며 더 좋은 선택을 상상할 수 있습니다.
감정의 강도와 빈도도 함께 기록되어, 차트를 통해 한눈에 확인할 수 있습니다.

## 🚀 데모
- Live: https://Jhoon1018.github.io/emotion-diary-new

## ✨ 주요 기능
- 감정/상황/반응 입력 및 리스트 보기
- 차트 통계 (react-chartjs-2, chart.js)
- 로컬 스토리지 저장(데이터 유지, 장바구니/임시 저장 기능과 유사)

## 🛠 기술 스택
- React (CRA)
- react-chartjs-2, chart.js, chartjs-chart-wordcloud
- framer-motion

## ➕추가 해 보고 싶은 기능(to be continued)
- 감정 코칭을 위한 방법론이 들어가면 좋을거 같다.
- 상황별 감정을 차트화 시킬 수 있는 기술(글자 단위로 쪼개서 차트화 시킬 수 있는 개발을 도전했으나 실패) 
- 참고에 붙은 사진은 각 감정을 자세히 분류 해 놓은 표인데 이걸 시작 페이지에서 각 감정을 클릭했을때 브레인 스토밍 처럼 펼칠 수 있으면 좋겠다(hover로 해 보면 좋을거 같다)

## ▶️ 실행 방법 (로컬)
```bash
npm install
npm start
# 브라우저에서 http://localhost:3000 접속