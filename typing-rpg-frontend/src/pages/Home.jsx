/* ============================================
   Home.jsx - 픽셀 RPG 스타일 홈 페이지
   ============================================ */

import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="pixel-home-container">
      <div className="pixel-home-wrapper">
        <div className="pixel-home-card">
          {/* 게임 로고/제목 */}
          <div className="pixel-home-logo">
            <h1 className="pixel-home-title">TYPING RPG</h1>
            <div className="pixel-home-subtitle">ADVENTURE AWAITS!</div>
          </div>

          {/* 중앙 패널 */}
          <div className="pixel-home-panel">
            <div className="pixel-home-message">
              타이핑으로 몬스터를 물리치고
              <br />
              레벨업하세요!
            </div>

            {/* 시작 버튼 */}
            <Link to="/content" className="pixel-home-btn">
              START GAME
            </Link>

            {/* 추가 정보 */}
            <div className="pixel-home-info">
              <div className="pixel-home-info-item">
                <span className="pixel-home-info-label">🎮</span>
                <span>5개의 스테이지</span>
              </div>
              <div className="pixel-home-info-item">
                <span className="pixel-home-info-label">⚔️</span>
                <span>다양한 몬스터</span>
              </div>
              <div className="pixel-home-info-item">
                <span className="pixel-home-info-label">📈</span>
                <span>레벨업 시스템</span>
              </div>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="pixel-home-footer">
            TypingRPG © 2025 - Practice Your Typing Skills
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
