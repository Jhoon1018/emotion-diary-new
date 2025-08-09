import React, { useState } from 'react';
import EmotionSelect from './components/EmotionSelect';
import SituationInput from './components/SituationInput';
import ReactionInput from './components/ReactionInput';
import ReflectionInput from './components/ReflectionInput';
import DiaryList from './components/DiaryList';
import EmotionStats from './components/EmotionStats';

function App() {
  const [step, setStep] = useState(1);
  const [filterWord, setFilterWord] = useState('');
  const [emotion, setEmotion] = useState('');
  const [emotionIntensity, setEmotionIntensity] = useState(5);
  const [situation, setSituation] = useState('');
  const [reaction, setReaction] = useState('');
  const [reflection, setReflection] = useState('');

  return (
    <div>
      {step === 1 && (
        <EmotionSelect onNext={({ emotion, intensity }) => {
          setEmotion(emotion);
          setEmotionIntensity(intensity);
          setStep(2);
        }}
        onList={() => setStep(5)}
        />
      )}
      {step === 2 && (
        <SituationInput emotion={emotion} onNext={(s) => {
          setSituation(s);
          setStep(3);
        }}
        onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <ReactionInput emotion={emotion} situation={situation} onNext={(r) => {
          setReaction(r);
          setStep(4);
        }}
        onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <ReflectionInput
          emotion={emotion}
          situation={situation}
          reaction={reaction}
          onSubmit={(ref) => {
            setReflection(ref);
            const newEntry = {
              id: new Date().toISOString(),
              emotion,
              emotionIntensity: Number(emotionIntensity),
              situation,
              reaction,
              reflection: ref,
            };
            const saved = JSON.parse(localStorage.getItem("emotionDiary") || "[]");
            localStorage.setItem("emotionDiary", JSON.stringify([newEntry, ...saved]));
            alert("기록 완료! 🎉 내 감정일기에 저장되었어요.");
            setEmotion('');
            setSituation('');
            setReaction('');
            setReflection('');
            setStep(5);
          }}
          onBack={() => setStep(3)}
        />
      )}
      {step === 5 && (
        <DiaryList
          keyword={filterWord}
          onWrite={() => { setFilterWord(''); setStep(1); }}
          onStats={() => { setFilterWord(''); setStep(6); }}
          onDelete={(idToDelete) => {
            const saved = JSON.parse(localStorage.getItem("emotionDiary") || "[]");
            const updated = saved.filter((entry) => entry.id !== idToDelete);
            localStorage.setItem("emotionDiary", JSON.stringify(updated));
          }}
          onEdit={(entryToEdit) => {
            setEmotion(entryToEdit.emotion);
            setSituation(entryToEdit.situation);
            setReaction(entryToEdit.reaction);
            setReflection(entryToEdit.reflection);
            const saved = JSON.parse(localStorage.getItem("emotionDiary") || "[]");
            const updated = saved.filter((entry) => entry.id !== entryToEdit.id);
            localStorage.setItem("emotionDiary", JSON.stringify(updated));
            setStep(4);
          }}
        />
      )}
      {step === 6 && (
        <EmotionStats
          onBack={() => setStep(5)}
          onWordClick={(word) => {
            setFilterWord(word);
            setStep(5);
          }}
        />
      )}
    </div>
  );
}

export default App;
