/* ============================================
   items.js - 상점 아이템 데이터
   ============================================ */

/**
 * 상점에서 판매하는 아이템 목록
 */
export const shopItems = [
  // ========== 무기 (Weapons) ==========
  {
    id: 1,
    name: '나무 검',
    type: 'weapon',
    price: 100,
    stats: {
      atk: 5
    },
    description: '기본적인 나무 검. 공격력이 소폭 증가합니다.',
    icon: '🗡️'
  },
  {
    id: 2,
    name: '철 검',
    type: 'weapon',
    price: 300,
    stats: {
      atk: 15
    },
    description: '단단한 철로 만든 검. 공격력이 크게 증가합니다.',
    icon: '⚔️'
  },
  {
    id: 3,
    name: '은빛 대검',
    type: 'weapon',
    price: 600,
    stats: {
      atk: 30
    },
    description: '은빛으로 빛나는 대검. 강력한 공격력을 자랑합니다.',
    icon: '🗡️'
  },
  {
    id: 4,
    name: '전설의 검',
    type: 'weapon',
    price: 1500,
    stats: {
      atk: 60
    },
    description: '전설로 내려오는 강력한 검. 최상급 공격력.',
    icon: '⚔️'
  },

  // ========== 방어구 (Armor) ==========
  {
    id: 5,
    name: '가죽 갑옷',
    type: 'armor',
    price: 150,
    stats: {
      maxHp: 20
    },
    description: '가죽으로 만든 갑옷. 체력이 소폭 증가합니다.',
    icon: '🛡️'
  },
  {
    id: 6,
    name: '철 갑옷',
    type: 'armor',
    price: 400,
    stats: {
      maxHp: 50
    },
    description: '철판으로 만든 튼튼한 갑옷. 체력이 크게 증가합니다.',
    icon: '🛡️'
  },
  {
    id: 7,
    name: '은빛 갑옷',
    type: 'armor',
    price: 800,
    stats: {
      maxHp: 100
    },
    description: '은빛으로 빛나는 중갑옷. 높은 방어력을 제공합니다.',
    icon: '🛡️'
  },
  {
    id: 8,
    name: '드래곤 아머',
    type: 'armor',
    price: 2000,
    stats: {
      maxHp: 200
    },
    description: '드래곤 비늘로 만든 최강의 갑옷. 최상급 방어력.',
    icon: '🛡️'
  }
]

/**
 * 아이템 ID로 아이템 찾기
 * @param {number} id - 아이템 ID
 * @returns {Object|null} 아이템 객체 또는 null
 */
export const getItemById = (id) => {
  return shopItems.find(item => item.id === id) || null
}

/**
 * 타입별 아이템 필터링
 * @param {string} type - 아이템 타입 (weapon, armor)
 * @returns {Array} 필터링된 아이템 배열
 */
export const getItemsByType = (type) => {
  return shopItems.filter(item => item.type === type)
}

/**
 * 가격 범위로 아이템 필터링
 * @param {number} minPrice - 최소 가격
 * @param {number} maxPrice - 최대 가격
 * @returns {Array} 필터링된 아이템 배열
 */
export const getItemsByPriceRange = (minPrice, maxPrice) => {
  return shopItems.filter(item => item.price >= minPrice && item.price <= maxPrice)
}

/**
 * 모든 무기 가져오기
 * @returns {Array} 무기 배열
 */
export const getAllWeapons = () => {
  return getItemsByType('weapon')
}

/**
 * 모든 방어구 가져오기
 * @returns {Array} 방어구 배열
 */
export const getAllArmor = () => {
  return getItemsByType('armor')
}
