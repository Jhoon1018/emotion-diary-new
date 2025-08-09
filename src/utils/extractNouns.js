// utils/extractNouns.js
const stopwords = ['그리고', '그러나', '해서', '였다', '한다', '있다', '없다', '것이다', '입니다'];

export default function extractNouns(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .replace(/[^\uAC00-\uD7A3a-zA-Z0-9\s]/g, '') // 한글/영어/숫자/공백만 남김
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w =>
      w.length >= 2 &&
      !stopwords.includes(w) &&
      !/^[0-9]+$/.test(w)
    );
}
