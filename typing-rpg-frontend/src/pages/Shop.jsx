/* ============================================
   Shop.jsx - 픽셀 RPG 스타일 상점 페이지
   ============================================ */

import { useState } from 'react'
import { useGame } from '../context/GameContext'
import { shopItems } from '../data/items'
import { addItemToInventory } from '../utils/storage'
import './Shop.css'

function Shop() {
  const { player, updatePlayer } = useGame()
  const [selectedType, setSelectedType] = useState('all') // all, weapon, armor

  // 타입별 필터링
  const filteredItems = selectedType === 'all'
    ? shopItems
    : shopItems.filter(item => item.type === selectedType)

  // 아이템 구매
  const handleBuy = (item) => {
    if (player.gold >= item.price) {
      // 골드 차감
      const newGold = player.gold - item.price

      // 스탯 적용
      let updatedPlayer = { gold: newGold }

      if (item.stats.atk) {
        updatedPlayer.atk = player.atk + item.stats.atk
      }
      if (item.stats.maxHp) {
        updatedPlayer.maxHp = player.maxHp + item.stats.maxHp
        updatedPlayer.hp = player.hp + item.stats.maxHp // 현재 HP도 증가
      }

      // 플레이어 업데이트
      updatePlayer(updatedPlayer)

      // 인벤토리에 추가
      addItemToInventory(item)

      alert(`${item.name}을(를) 구매했습니다!`)
    } else {
      alert('골드가 부족합니다!')
    }
  }

  // 아이템 타입별 색상
  const getTypeColor = (type) => {
    switch (type) {
      case 'weapon': return '#ff6666'
      case 'armor': return '#66b3ff'
      default: return '#ffffff'
    }
  }

  // 아이템 타입 한글명
  const getTypeLabel = (type) => {
    switch (type) {
      case 'weapon': return '무기'
      case 'armor': return '방어구'
      default: return ''
    }
  }

  // 아이템 효과 표시
  const getItemEffect = (item) => {
    const effects = []
    if (item.stats.atk) effects.push(`ATK +${item.stats.atk}`)
    if (item.stats.maxHp) effects.push(`HP +${item.stats.maxHp}`)
    return effects.join(' / ')
  }

  return (
    <div className="pixel-shop-container">
      <div className="pixel-shop-wrapper">
        <div className="pixel-shop-card">
          {/* 제목 */}
          <h1 className="pixel-shop-title">SHOP</h1>

          {/* 플레이어 골드 */}
          <div className="pixel-shop-gold">
            <span className="pixel-gold-label">💰 보유 골드:</span>
            <span className="pixel-gold-value">{player.gold.toLocaleString()} G</span>
          </div>

          {/* 타입 필터 */}
          <div className="pixel-shop-filters">
            <button
              className={`pixel-filter-btn ${selectedType === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedType('all')}
            >
              전체
            </button>
            <button
              className={`pixel-filter-btn ${selectedType === 'weapon' ? 'active' : ''}`}
              onClick={() => setSelectedType('weapon')}
            >
              ⚔️ 무기
            </button>
            <button
              className={`pixel-filter-btn ${selectedType === 'armor' ? 'active' : ''}`}
              onClick={() => setSelectedType('armor')}
            >
              🛡️ 방어구
            </button>
          </div>

          {/* 아이템 그리드 */}
          <div className="pixel-shop-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="pixel-shop-item">
                {/* 아이템 아이콘 */}
                <div className="pixel-item-icon">{item.icon}</div>

                {/* 아이템 타입 */}
                <div
                  className="pixel-item-type"
                  style={{ color: getTypeColor(item.type) }}
                >
                  {getTypeLabel(item.type)}
                </div>

                {/* 아이템 이름 */}
                <div className="pixel-item-name">{item.name}</div>

                {/* 아이템 설명 */}
                <div className="pixel-item-description">{item.description}</div>

                {/* 아이템 효과 */}
                <div className="pixel-item-effect">{getItemEffect(item)}</div>

                {/* 가격 */}
                <div className="pixel-item-price">{item.price.toLocaleString()} G</div>

                {/* 구매 버튼 */}
                <button
                  className="pixel-buy-btn"
                  onClick={() => handleBuy(item)}
                  disabled={player.gold < item.price}
                >
                  {player.gold >= item.price ? 'BUY' : 'SOLD OUT'}
                </button>
              </div>
            ))}
          </div>

          {/* 하단 정보 */}
          <div className="pixel-shop-footer">
            아이템을 구매하여 더 강해지세요!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
