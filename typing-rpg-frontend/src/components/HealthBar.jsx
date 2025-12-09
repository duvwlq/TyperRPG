/* ============================================
   HealthBar.jsx - 체력바 컴포넌트
   ============================================ */

import { memo } from 'react'
import './HealthBar.css'

/**
 * HealthBar - 체력을 바 형태로 표시
 *
 * @param {string} label - 라벨 (예: "Player", "Monster")
 * @param {number} current - 현재 체력
 * @param {number} max - 최대 체력
 * @param {string} color - 바 색상 (기본: 빨강)
 */
function HealthBar({ label, current, max, color = 'red' }) {
  // 체력 비율 계산 (0-100%)
  const percentage = Math.max(0, Math.min(100, (current / max) * 100))

  return (
    <div className="health-bar-container">
      {/* 라벨 */}
      <div className="health-bar-label">
        <span className="health-bar-name">{label}</span>
        <span className="health-bar-value">
          {current} / {max}
        </span>
      </div>

      {/* 체력바 배경 */}
      <div className="health-bar-bg">
        {/* 체력바 (현재 체력만큼 채워짐) */}
        <div
          className={`health-bar-fill health-bar-${color}`}
          style={{ width: `${percentage}%` }}
        >
          {/* 반짝이는 효과 */}
          <div className="health-bar-shine"></div>
        </div>
      </div>
    </div>
  )
}

// React.memo로 감싸서 props가 변경될 때만 리렌더링
export default memo(HealthBar)
