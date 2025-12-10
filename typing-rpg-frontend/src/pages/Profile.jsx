/* ============================================
   Profile.jsx - 픽셀 RPG 스타일 프로필 페이지 (API 연동)
   ============================================ */

import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { api } from '../api/client';
import './Profile.css';

function Profile() {
  const { player, nickname } = useGame();
  const [gameScores, setGameScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (nickname) {
      loadGameScores();
    }
  }, [nickname]);

  const loadGameScores = async () => {
    try {
      setLoading(true);
      const data = await api.getPlayerScores(nickname);
      setGameScores(data);
    } catch (err) {
      console.error('게임 기록 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!player) {
    return (
      <div className="pixel-profile-container">
        <div className="pixel-profile-wrapper">
          <div className="pixel-profile-card">
            <h1 className="pixel-profile-title">PROFILE</h1>
            <div className="pixel-ranking-empty">
              플레이어 정보를 불러오는 중...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 다음 레벨까지 필요한 경험치
  const expToNextLevel = player.level * 100;
  const expProgress = (player.exp / expToNextLevel) * 100;

  // 게임 통계 계산
  const totalGames = player.gamesPlayed || 0;
  const victories = player.gamesWon || 0;
  const defeats = totalGames - victories;
  const winRate = totalGames > 0 ? ((victories / totalGames) * 100).toFixed(1) : 0;

  return (
    <div className="pixel-profile-container">
      <div className="pixel-profile-wrapper">
        <div className="pixel-profile-card">
          {/* 제목 */}
          <h1 className="pixel-profile-title">PROFILE</h1>

          <div className="pixel-profile-layout">
            {/* 좌측: 캐릭터 정보 */}
            <div className="pixel-profile-character">
              {/* 캐릭터 아바타 */}
              <div className="pixel-avatar-box">
                <div className="pixel-avatar">🧙‍♂️</div>
              </div>

              {/* 캐릭터 이름 */}
              <div className="pixel-character-name">{player.nickname}</div>

              {/* 레벨 */}
              <div className="pixel-character-level">Lv. {player.level}</div>

              {/* 경험치 바 */}
              <div className="pixel-exp-section">
                <div className="pixel-exp-label">
                  EXP: {player.exp} / {expToNextLevel}
                </div>
                <div className="pixel-exp-bar">
                  <div
                    className="pixel-exp-fill"
                    style={{ width: `${expProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* 우측: 스탯 & 통계 */}
            <div className="pixel-profile-stats">
              {/* 기본 스탯 */}
              <div className="pixel-stats-section">
                <h3 className="pixel-section-title">기본 정보</h3>
                <div className="pixel-stats-grid">
                  {/* HP */}
                  <div className="pixel-stat-item">
                    <span className="pixel-stat-icon">❤️</span>
                    <span className="pixel-stat-name">HP</span>
                    <span className="pixel-stat-value">{player.hp} / {player.maxHp}</span>
                  </div>

                  {/* 공격력 */}
                  <div className="pixel-stat-item">
                    <span className="pixel-stat-icon">⚔️</span>
                    <span className="pixel-stat-name">공격력</span>
                    <span className="pixel-stat-value">{player.atk}</span>
                  </div>

                  {/* 레벨 */}
                  <div className="pixel-stat-item">
                    <span className="pixel-stat-icon">⬆️</span>
                    <span className="pixel-stat-name">레벨</span>
                    <span className="pixel-stat-value">{player.level}</span>
                  </div>

                  {/* 골드 */}
                  <div className="pixel-stat-item">
                    <span className="pixel-stat-icon">💰</span>
                    <span className="pixel-stat-name">골드</span>
                    <span className="pixel-stat-value">{player.gold.toLocaleString()} G</span>
                  </div>

                  {/* 총 점수 */}
                  <div className="pixel-stat-item">
                    <span className="pixel-stat-icon">🏆</span>
                    <span className="pixel-stat-name">총 점수</span>
                    <span className="pixel-stat-value">{player.totalScore.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* 게임 통계 */}
              <div className="pixel-stats-section">
                <h3 className="pixel-section-title">게임 기록</h3>
                <div className="pixel-record-grid">
                  {/* 총 게임 수 */}
                  <div className="pixel-record-item">
                    <span className="pixel-record-label">총 게임:</span>
                    <span className="pixel-record-value">{totalGames}회</span>
                  </div>

                  {/* 승리 */}
                  <div className="pixel-record-item">
                    <span className="pixel-record-label">승리:</span>
                    <span className="pixel-record-value" style={{ color: '#66ff66' }}>
                      {victories}회
                    </span>
                  </div>

                  {/* 패배 */}
                  <div className="pixel-record-item">
                    <span className="pixel-record-label">패배:</span>
                    <span className="pixel-record-value" style={{ color: '#ff6666' }}>
                      {defeats}회
                    </span>
                  </div>

                  {/* 승률 */}
                  <div className="pixel-record-item">
                    <span className="pixel-record-label">승률:</span>
                    <span className="pixel-record-value">{winRate}%</span>
                  </div>
                </div>
              </div>

              {/* 최근 게임 기록 */}
              <div className="pixel-stats-section">
                <h3 className="pixel-section-title">최근 게임 기록</h3>
                {loading ? (
                  <div className="pixel-ranking-empty">로딩 중...</div>
                ) : gameScores.length > 0 ? (
                  <div className="pixel-recent-games">
                    {gameScores.slice(0, 5).map((score) => (
                      <div key={score.id} className="pixel-game-record">
                        <span className="pixel-game-result">
                          {score.isWin ? '🏆 승리' : '💀 패배'}
                        </span>
                        <span className="pixel-game-score">점수: {score.score}</span>
                        <span className="pixel-game-wpm">WPM: {Math.round(score.wpm)}</span>
                        <span className="pixel-game-accuracy">
                          정확도: {score.accuracy.toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pixel-ranking-empty">아직 게임 기록이 없습니다.</div>
                )}
              </div>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="pixel-profile-footer">
            게임을 플레이하여 더 많은 기록을 세워보세요!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
