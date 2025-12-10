/* ============================================
   Navbar.jsx - 상단 네비게이션 바
   ============================================ */

import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const { player } = useGame()

  return (
    <nav className="navbar">
      {/* 로고 영역 */}
      <div className="navbar-logo">
        <Link to="/">⚔️ TYPING RPG</Link>
      </div>

      {/* 메뉴 리스트 */}
      <ul className="navbar-menu">
        <li>
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            홈
          </Link>
        </li>
        <li>
          <Link
            to="/content"
            className={location.pathname === '/content' ? 'active' : ''}
          >
            게임
          </Link>
        </li>
        <li>
          <Link
            to="/ranking"
            className={location.pathname === '/ranking' ? 'active' : ''}
          >
            랭킹
          </Link>
        </li>
        <li>
          <Link
            to="/shop"
            className={location.pathname === '/shop' ? 'active' : ''}
          >
            상점
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={location.pathname === '/profile' ? 'active' : ''}
          >
            프로필
          </Link>
        </li>
      </ul>

      {/* 플레이어 정보 */}
      {player && (
        <div className="navbar-player">
          <span className="navbar-level">Lv.{player.level}</span>
          <span className="navbar-gold">💰 {player.gold}G</span>
        </div>
      )}
    </nav>
  )
}

// React.memo로 감싸서 불필요한 리렌더링 방지
// player.level, player.gold, location.pathname이 변경될 때만 리렌더링
export default memo(Navbar)
