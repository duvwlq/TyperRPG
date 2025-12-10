/* ============================================
   Shop.jsx - 픽셀 RPG 스타일 상점 페이지 (API 연동)
   ============================================ */

import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { api } from '../api/client';
import './Shop.css';

function Shop() {
  const { player, purchaseItem } = useGame();
  const [selectedType, setSelectedType] = useState('all'); // all, weapon, armor
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getItems();
      // 중복 제거 (ID 1-8만 사용)
      const uniqueItems = data.filter(item => item.id <= 8);
      setItems(uniqueItems);
    } catch (err) {
      console.error('아이템 로드 실패:', err);
      setError('아이템을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 타입별 필터링
  const filteredItems = selectedType === 'all'
    ? items
    : items.filter(item => item.type === selectedType);

  // 아이템 구매
  const handleBuy = async (item) => {
    if (!player || player.gold < item.price) {
      alert('골드가 부족합니다!');
      return;
    }

    try {
      await purchaseItem(item.id);
      alert(`${item.name}을(를) 구매했습니다!`);
    } catch (err) {
      console.error('구매 실패:', err);
      alert(err.message || '구매에 실패했습니다.');
    }
  };

  // 아이템 타입별 색상
  const getTypeColor = (type) => {
    switch (type) {
      case 'weapon': return '#ff6666';
      case 'armor': return '#66b3ff';
      default: return '#ffffff';
    }
  };

  // 아이템 타입 한글명
  const getTypeLabel = (type) => {
    switch (type) {
      case 'weapon': return '무기';
      case 'armor': return '방어구';
      default: return '';
    }
  };

  // 아이템 효과 표시
  const getItemEffect = (item) => {
    const effects = [];
    if (item.atkBonus) effects.push(`ATK +${item.atkBonus}`);
    if (item.hpBonus) effects.push(`HP +${item.hpBonus}`);
    return effects.join(' / ');
  };

  return (
    <div className="pixel-shop-container">
      <div className="pixel-shop-wrapper">
        <div className="pixel-shop-card">
          {/* 제목 */}
          <h1 className="pixel-shop-title">SHOP</h1>

          {/* 플레이어 골드 */}
          <div className="pixel-shop-gold">
            <span className="pixel-gold-label">💰 보유 골드:</span>
            <span className="pixel-gold-value">
              {player ? player.gold.toLocaleString() : 0} G
            </span>
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

          {/* 로딩 중 */}
          {loading && (
            <div className="pixel-shop-footer" style={{ marginTop: '20px' }}>
              아이템을 불러오는 중...
            </div>
          )}

          {/* 에러 */}
          {error && (
            <div className="pixel-shop-footer" style={{ marginTop: '20px', color: '#ff6b6b' }}>
              {error}
            </div>
          )}

          {/* 아이템 그리드 */}
          {!loading && !error && filteredItems.length > 0 && (
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
                    disabled={!player || player.gold < item.price}
                  >
                    {player && player.gold >= item.price ? 'BUY' : 'SOLD OUT'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 하단 정보 */}
          <div className="pixel-shop-footer">
            아이템을 구매하여 더 강해지세요!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
