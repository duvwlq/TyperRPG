/* ============================================
   main.jsx - 앱의 시작점 (엔트리 포인트)
   ============================================ */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GameProvider } from './context/GameContext'  // 게임 상태 관리
import './index.css'
import App from './App.jsx'

// React 앱을 DOM에 렌더링
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter: URL 기반 페이지 이동 */}
    <BrowserRouter>
      {/* GameProvider: 게임 전역 상태 제공 (플레이어 정보, 인벤토리 등) */}
      <GameProvider>
        <App />
      </GameProvider>
    </BrowserRouter>
  </StrictMode>,
)
