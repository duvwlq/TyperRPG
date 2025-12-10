import { useState } from 'react';
import '../styles/NicknameModal.css';

/**
 * 닉네임 입력 모달 컴포넌트
 * 게임 시작 시 사용자의 닉네임을 입력받습니다.
 */
const NicknameModal = ({ onSubmit }) => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // 유효성 검사
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    if (nickname.length < 2 || nickname.length > 12) {
      setError('닉네임은 2~12자로 입력해주세요.');
      return;
    }

    // 특수문자 체크 (한글, 영문, 숫자만 허용)
    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!nicknameRegex.test(nickname)) {
      setError('한글, 영문, 숫자만 사용 가능합니다.');
      return;
    }

    // LocalStorage에 닉네임 저장
    localStorage.setItem('typingRpg_nickname', nickname);
    onSubmit(nickname);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>TyperRPG</h2>
        <p>닉네임을 입력하고 모험을 시작하세요!</p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setError('');
          }}
          placeholder="닉네임 (2~12자)"
          maxLength={12}
          onKeyPress={handleKeyPress}
          autoFocus
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleSubmit}>시작하기</button>
      </div>
    </div>
  );
};

export default NicknameModal;
