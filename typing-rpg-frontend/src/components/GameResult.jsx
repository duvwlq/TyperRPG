/* ============================================
   GameResult.jsx - 게임 결과 모달
   ============================================ */

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { saveRanking } from '../utils/storage'
import './GameResult.css'

/**
 * GameResult - 게임 종료 시 결과를 보여주는 모달
 *
 * @param {object} result - 게임 결과 데이터
 *   - score: 점수
 *   - wpm: WPM
 *   - accuracy: 정확도
 *   - exp: 획득 경험치
 *   - gold: 획득 골드
 *   - levelUp: 레벨업 여부
 *   - victory: 승리 여부
 * @param {function} onClose - 모달 닫기 함수
 * @param {function} onRestart - 다시 하기 함수
 */
function GameResult({ result, onClose, onRestart }) {
  const navigate = useNavigate()
  const { player } = useGame()

  // 승리 시 랭킹에 저장
  useEffect(() => {
    if (result.victory) {
      saveRanking({
        nickname: '플레이어', // 나중에 닉네임 시스템 추가
        level: player.level,
        score: result.score,
        wpm: result.wpm,
        accuracy: result.accuracy
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * 메인으로 이동
   */
  const goHome = () => {
    onClose()
    navigate('/')
  }

  /**
   * 랭킹 보기
   */
  const goRanking = () => {
    onClose()
    navigate('/ranking')
  }

  return (
    <div className="game-result-overlay">
      <div className="game-result-modal">
        {/* 제목 */}
        <h2 className="result-title">
          {result.victory ? '승리!' : '게임 종료'}
        </h2>

        {/* 레벨업 메시지 */}
        {result.levelUp && (
          <div className="result-levelup">
            🎉 레벨 업! 🎉
          </div>
        )}

        {/* 결과 정보 */}
        <div className="result-stats">
          {/* 점수 */}
          <div className="result-stat">
            <div className="result-stat-label">점수</div>
            <div className="result-stat-value result-score">
              {result.score.toLocaleString()}
            </div>
          </div>

          {/* WPM */}
          <div className="result-stat">
            <div className="result-stat-label">WPM</div>
            <div className="result-stat-value result-wpm">
              {result.wpm.toFixed(1)}
            </div>
          </div>

          {/* 정확도 */}
          <div className="result-stat">
            <div className="result-stat-label">정확도</div>
            <div className="result-stat-value result-accuracy">
              {result.accuracy.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* 보상 */}
        <div className="result-rewards">
          <div className="result-reward">
            <span className="reward-icon">⭐</span>
            <span className="reward-text">경험치 +{result.exp}</span>
          </div>
          <div className="result-reward">
            <span className="reward-icon">💰</span>
            <span className="reward-text">골드 +{result.gold}</span>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="result-buttons">
          <button className="btn-primary" onClick={onRestart}>
            다시 하기
          </button>
          <button className="btn-small" onClick={goRanking}>
            랭킹 보기
          </button>
          <button className="btn-small" onClick={goHome}>
            메인으로
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameResult
