/* ============================================
   ContentSelect.jsx - 픽셀 RPG 스타일 콘텐츠 선택 페이지
   ============================================ */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllContents } from '../data/sentences'
import './ContentSelect.css'

function ContentSelect() {
    const navigate = useNavigate()

    // 모든 콘텐츠 가져오기
    const contents = getAllContents()

    // 선택된 콘텐츠 ID
    const [selectedId, setSelectedId] = useState(contents[0]?.id || null)

    // 선택된 콘텐츠 정보
    const selectedContent = contents.find(c => c.id === selectedId)

    /**
     * 무한 타이핑 모드 시작
     */
    const handleStartInfinite = () => {
        if (selectedId) {
            navigate(`/game/${selectedId}`)
        }
    }

    /**
     * 보스 배틀 모드 시작
     */
    const handleStartBoss = () => {
        if (selectedId) {
            navigate(`/game-boss/${selectedId}`)
        }
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

    return (
        <div className="pixel-content-container">
            <div className="pixel-content-wrapper">
                <div className="pixel-content-card">
                    {/* 제목 */}
                    <h1 className="pixel-content-title">스테이지 선택</h1>

                    <div className="pixel-content-layout">
                        {/* 좌측: 콘텐츠 목록 */}
                        <div className="pixel-content-list">
                            <h3 className="pixel-list-title">문장 세트</h3>
                            {contents.map(content => (
                                <div
                                    key={content.id}
                                    className={`pixel-content-item ${selectedId === content.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedId(content.id)}
                                >
                                    <div className="pixel-item-title">{content.title}</div>
                                    <div
                                        className="pixel-item-difficulty"
                                        style={{ color: getDifficultyColor(content.difficulty) }}
                                    >
                                        {content.difficulty.toUpperCase()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 우측: 선택된 콘텐츠 상세 */}
                        {selectedContent && (
                            <div className="pixel-content-detail">
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

                                    {/* 문장 수 */}
                                    <div className="pixel-stat-row">
                                        <span className="pixel-stat-label">문장 수:</span>
                                        <span className="pixel-stat-value">5개</span>
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
                      EXP {selectedContent.monster.exp}, GOLD {selectedContent.monster.gold}
                    </span>
                                    </div>
                                </div>

                                {/* 모드 선택 버튼 */}
                                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                    <button
                                        className="pixel-start-btn"
                                        onClick={handleStartInfinite}
                                        style={{ flex: 1 }}
                                    >
                                        무한 타이핑
                                    </button>
                                    <button
                                        className="pixel-start-btn"
                                        onClick={handleStartBoss}
                                        style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                                    >
                                        보스 배틀
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
