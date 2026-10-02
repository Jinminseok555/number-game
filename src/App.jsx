import { useState } from 'react';
import './App.css';

export default function App() {
  // 1. 게임에 필요한 상태(State) 정의
  const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 100) + 1); // 1~100 사이의 랜덤 숫자
  const [guess, setGuess] = useState(''); // 사용자가 입력한 값
  const [message, setMessage] = useState('1부터 100 사이의 숫자를 맞춰보세요!'); // 안내 메시지
  const [attempts, setAttempts] = useState(0); // 시도 횟수
  const [isGameOver, setIsGameOver] = useState(false); // 게임 종료 여부

  // 2. 숫자를 입력하고 제출했을 때 실행되는 함수
  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const userNum = parseInt(guess, 10);

    if (isNaN(userNum) || userNum < 1 || userNum > 100) {
      setMessage('1부터 100 사이의 유효한 숫자를 입력해주세요!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (userNum === targetNumber) {
      setMessage(`🎉 정답입니다! ${newAttempts}번 만에 맞추셨습니다.`);
      setIsGameOver(true);
    } else if (userNum < targetNumber) {
      setMessage('📈 UP! 더 큰 숫자를 입력하세요.');
    } else {
      setMessage('📉 DOWN! 더 작은 숫자를 입력하세요.');
    }

    setGuess(''); // 입력창 비우기
  };

  // 3. 게임 재시작 함수
  const handleResetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('새로운 게임이 시작되었습니다! 숫자를 맞춰보세요.');
    setAttempts(0);
    setIsGameOver(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>🎯 업 다운 게임</h1>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{message}</p>
      <p>시도 횟수: {attempts}회</p>

      {!isGameOver ? (
        <form onSubmit={handleGuessSubmit}>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="숫자 입력"
            style={{ padding: '10px', fontSize: '16px', width: '150px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
            확인
          </button>
        </form>
      ) : (
        <button onClick={handleResetGame} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          다시 시작하기
        </button>
      )}
    </div>
  );
}