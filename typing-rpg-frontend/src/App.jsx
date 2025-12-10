/* ============================================
   App.jsx - 메인 앱 컴포넌트 (라우터 설정)
   ============================================ */

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useGame } from './context/GameContext';
import Navbar from './components/Navbar';
import NicknameModal from './components/NicknameModal';

// 페이지 컴포넌트 import
import Home from './pages/Home';
import ContentSelect from './pages/ContentSelect';
import GamePlay from './pages/GamePlay';
import GamePlayBoss from './pages/GamePlayBoss';
import Ranking from './pages/Ranking';
import Shop from './pages/Shop';
import Profile from './pages/Profile';

function App() {
  const { nickname, loading, setNickname } = useGame();
  const [showNicknameModal, setShowNicknameModal] = useState(false);

  useEffect(() => {
    if (!loading && !nickname) {
      setShowNicknameModal(true);
    }
  }, [loading, nickname]);

  const handleNicknameSubmit = async (nick) => {
    await setNickname(nick);
    setShowNicknameModal(false);
  };

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="app">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: '#d4a574',
          fontSize: '1.5em'
        }}>
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* 닉네임 모달 - 닉네임이 없을 때만 표시 */}
      {showNicknameModal && (
        <NicknameModal onSubmit={handleNicknameSubmit} />
      )}

      {/* 상단 네비게이션 바 - 모든 페이지에 공통으로 표시 */}
      <Navbar />

      {/* 라우터: URL에 따라 다른 페이지를 보여줌 */}
      <Routes>
        {/* 메인 페이지 - 시작 화면 */}
        <Route path="/" element={<Home />} />

        {/* 콘텐츠 선택 페이지 - 게임할 문장 선택 */}
        <Route path="/content" element={<ContentSelect />} />

        {/* 게임 플레이 페이지 - 실제 타이핑 게임 */}
        <Route path="/game/:contentId" element={<GamePlay />} />

        {/* BOSS 전투 페이지 - img.png 디자인 기반 */}
        <Route path="/game-boss/:contentId" element={<GamePlayBoss />} />

        {/* 랭킹 페이지 - 전체 순위 확인 */}
        <Route path="/ranking" element={<Ranking />} />

        {/* 상점 페이지 - 아이템 구매 */}
        <Route path="/shop" element={<Shop />} />

        {/* 프로필 페이지 - 내 정보 확인 */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
