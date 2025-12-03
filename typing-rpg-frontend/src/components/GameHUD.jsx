/* ============================================
   GameHUD.jsx - 게임 상단 정보 표시
   ============================================ */

import './GameHUD.css'

/**
 * GameHUD - 게임 플레이 중 상단에 표시되는 정보
 *
 * @param {number} wpm - 현재 WPM
 * @param {number} accuracy - 정확도 (0-100)
 * @param {number} errors - 오타 횟수
 * @param {number} elapsedTime - 경과 시간 (초)
 */
function GameHUD({ wpm, accuracy, errors, elapsedTime }) {
  /**
   * 시간을 MM:SS 형식으로 변환
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="game-hud">
      {/* WPM */}
      <div className="hud-item">
        <div className="hud-label">WPM</div>
        <div className="hud-value hud-wpm">{wpm.toFixed(1)}</div>
      </div>

      {/* 정확도 */}
      <div className="hud-item">
        <div className="hud-label">정확도</div>
        <div className="hud-value hud-accuracy">{accuracy.toFixed(1)}%</div>
      </div>

      {/* 오타 */}
      <div className="hud-item">
        <div className="hud-label">오타</div>
        <div className="hud-value hud-errors">{errors}</div>
      </div>

      {/* 시간 */}
      <div className="hud-item">
        <div className="hud-label">시간</div>
        <div className="hud-value hud-time">{formatTime(elapsedTime)}</div>
      </div>
    </div>
  )
}

export default GameHUD
