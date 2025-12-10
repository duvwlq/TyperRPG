/* ============================================
   ContentSelect.jsx - 픽셀 RPG 스타일 콘텐츠 선택 페이지 (2-컬럼 레이아웃)
   ============================================ */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllContents } from '../data/sentences'
import './ContentSelect.css'

function ContentSelect() {
    const navigate = useNavigate()

    // 모든 콘텐츠 가져오기
    const contents = getAllContents()

    // 선택된 콘텐츠 ID와 모드
    const [selectedId, setSelectedId] = useState(contents[0]?.id || null)
    const [selectedMode, setSelectedMode] = useState('infinite') // 'infinite' or 'boss'

    // 선택된 콘텐츠 정보
    const selectedContent = contents.find(c => c.id === selectedId)

    /**
     * GO 버튼 - 선택된 모드에 따라 네비게이션
     */
    const handleGo = () => {
        if (selectedId) {
            if (selectedMode === 'infinite') {
                navigate(`/game/${selectedId}`)
            } else {
                navigate(`/game-boss/${selectedId}`)
            }
        }
    }

    /**
     * 지역 선택 핸들러
     */
    const handleSelectRegion = (id, mode) => {
        setSelectedId(id)
        setSelectedMode(mode)
    }

    /**
     * 난이도 색상
     */
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return '#66ff66'
            case 'normal': return '#ffcc66'
            case 'hard': return '#ff9966'
            case 'very-hard': return '#ff6666'
            default: return '#ffffff'
        }
    }

    /**
     * 난이도별 배경 그라데이션
     */
    const getBackgroundGradient = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            case 'normal':
                return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
            case 'hard':
                return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            case 'very-hard':
                return 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
            default:
                return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }
    }

    return (
        <div className="pixel-content-container">
            <div className="pixel-content-wrapper">
                <div className="pixel-content-card">
                    {/* 제목 */}
                    <h1 className="pixel-content-title">모드/지역 선택</h1>

                    <div className="pixel-content-layout">
                        {/* 좌측: 모드/지역 선택 영역 */}
                        <div className="pixel-content-list">
                            {/* Infinite Typing 섹션 */}
                            <div className="pixel-mode-section">
                                <h3 className="pixel-mode-title">⚡ Infinite Typing</h3>
                                <div className="pixel-region-cards">
                                    {contents.map(content => (
                                        <div
                                            key={`infinite-${content.id}`}
                                            className={`pixel-region-card ${
                                                selectedId === content.id && selectedMode === 'infinite' ? 'selected' : ''
                                            }`}
                                            onClick={() => handleSelectRegion(content.id, 'infinite')}
                                        >
                                            <div className="pixel-card-title">{content.title}</div>
                                            <div
                                                className="pixel-card-difficulty"
                                                style={{ color: getDifficultyColor(content.difficulty) }}
                                            >
                                                {content.difficulty.toUpperCase()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Boss Battle 섹션 */}
                            <div className="pixel-mode-section">
                                <h3 className="pixel-mode-title">⚔️ Boss Battle</h3>
                                <div className="pixel-region-cards">
                                    {contents.map(content => (
                                        <div
                                            key={`boss-${content.id}`}
                                            className={`pixel-region-card ${
                                                selectedId === content.id && selectedMode === 'boss' ? 'selected' : ''
                                            }`}
                                            onClick={() => handleSelectRegion(content.id, 'boss')}
                                        >
                                            <div className="pixel-card-title">{content.title}</div>
                                            <div
                                                className="pixel-card-difficulty"
                                                style={{ color: getDifficultyColor(content.difficulty) }}
                                            >
                                                {content.difficulty.toUpperCase()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 우측: 선택된 지역 상세 정보 */}
                        {selectedContent && (
                            <div className="pixel-content-detail">
                                {/* 배경 이미지 영역 */}
                                <div
                                    className="pixel-detail-background"
                                    style={{
                                        background: getBackgroundGradient(selectedContent.difficulty)
                                    }}
                                >
                                    <div className="pixel-detail-mode-badge">
                                        {selectedMode === 'infinite' ? '⚡ Infinite Typing' : '⚔️ Boss Battle'}
                                    </div>
                                </div>

                                {/* 지역 정보 */}
                                <div className="pixel-detail-info">
                                    <h2 className="pixel-detail-title">{selectedContent.title}</h2>

                                    <div className="pixel-detail-description">
                                        {selectedContent.description}
                                    </div>

                                    <div className="pixel-detail-stats">
                                        {/* 난이도 */}
                                        <div className="pixel-stat-row">
                                            <span className="pixel-stat-label">난이도:</span>
                                            <span
                                                className="pixel-stat-value"
                                                style={{ color: getDifficultyColor(selectedContent.difficulty) }}
                                            >
                                                {selectedContent.difficulty.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* 권장 WPM */}
                                        <div className="pixel-stat-row">
                                            <span className="pixel-stat-label">권장 WPM:</span>
                                            <span className="pixel-stat-value">{selectedContent.recommendedWPM}</span>
                                        </div>

                                        {/* 몬스터 */}
                                        <div className="pixel-stat-row">
                                            <span className="pixel-stat-label">몬스터:</span>
                                            <span className="pixel-stat-value">{selectedContent.monster.name}</span>
                                        </div>

                                        {/* 보상 */}
                                        <div className="pixel-stat-row">
                                            <span className="pixel-stat-label">보상:</span>
                                            <span className="pixel-stat-value">
                                                EXP +{selectedContent.monster.exp} | GOLD +{selectedContent.monster.gold}
                                            </span>
                                        </div>
                                    </div>

                                    {/* GO 버튼 */}
                                    <button
                                        className="pixel-go-btn"
                                        onClick={handleGo}
                                    >
                                        GO →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentSelect
