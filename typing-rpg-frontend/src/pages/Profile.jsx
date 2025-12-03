/* ============================================
   Profile.jsx - 픽셀 RPG 스타일 프로필 페이지
   ============================================ */

import { useGame } from '../context/GameContext'
import './Profile.css'

function Profile() {
  const { player } = useGame()

  // 다음 레벨까지 필요한 경험치
  const expToNextLevel = player.level * 100
  const expProgress = (player.exp / expToNextLevel) * 100

  // 임시 게임 통계 (나중에 백엔드에서 가져올 예정)
  const gameStats = {
    totalGames: 42,
    victories: 35,
    defeats: 7,
    winRate: 83,
    highestWPM: 285,
    totalPlayTime: '12시간 34분',
    favoriteStage: '슬라임 숲'
  }

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
              <div className="pixel-character-name">플레이어</div>

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
                    <span className="pixel-record-value">{gameStats.totalGames}회</span>
                  </div>

                  {/* 승리 */}
                  <div className="pixel-record-item">
                    <span className="pixel-record-label">승리:</span>
                    <span className="pixel-record-value" style={{ color: '#66ff66' }}>
                      {gameStats.victories}회
                    </span>
                  </div>

                  {/* 패배 */}
                  <div className="pixel-record-item">
                    <span className="pixel-record-label">패배:</span>
                    <span className="pixel-record-value" style={{ color: '#ff6666' }}>
                      {gameStats.defeats}회
                    </span>
                  </div>

                  {/* 승률 */}
                  <div className="pixel-record-item">
                    <span className="pixel-record-label">승률:</span>
                    <span className="pixel-record-value">{gameStats.winRate}%</span>
                  </div>

                  {/* 최고 WPM */}
                  <div className="pixel-record-item">
                    <span className="pixel-record-label">최고 WPM:</span>
                    <span className="pixel-record-value">{gameStats.highestWPM}</span>
                  </div>

                  {/* 총 플레이 시간 */}
                  <div className="pixel-record-item">
                    <span className="pixel-record-label">플레이 시간:</span>
                    <span className="pixel-record-value">{gameStats.totalPlayTime}</span>
                  </div>

                  {/* 선호 스테이지 */}
                  <div className="pixel-record-item">
                    <span className="pixel-record-label">선호 스테이지:</span>
                    <span className="pixel-record-value">{gameStats.favoriteStage}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="pixel-profile-footer">
            계속 도전하여 더 강한 타이퍼가 되세요!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
