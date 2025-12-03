/* ============================================
   storage.js - LocalStorage 관리 유틸리티
   ============================================ */

const STORAGE_KEYS = {
  PLAYER: 'typingRpg_player',
  RANKINGS: 'typingRpg_rankings',
  NICKNAME: 'typingRpg_nickname',
  SETTINGS: 'typingRpg_settings',
  INVENTORY: 'typingRpg_inventory'
}

// ========== 플레이어 데이터 관리 ==========

/**
 * 플레이어 데이터 저장
 * @param {Object} playerData - 플레이어 데이터 객체
 */
export const savePlayerData = (playerData) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PLAYER, JSON.stringify(playerData))
    return true
  } catch (error) {
    console.error('플레이어 데이터 저장 실패:', error)
    return false
  }
}

/**
 * 플레이어 데이터 불러오기
 * @returns {Object|null} 플레이어 데이터 또는 null
 */
export const loadPlayerData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PLAYER)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('플레이어 데이터 불러오기 실패:', error)
    return null
  }
}

/**
 * 플레이어 데이터 초기화
 */
export const resetPlayerData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PLAYER)
    return true
  } catch (error) {
    console.error('플레이어 데이터 초기화 실패:', error)
    return false
  }
}

// ========== 랭킹 데이터 관리 ==========

/**
 * 랭킹 데이터 저장
 * @param {Object} scoreData - 점수 데이터
 */
export const saveRanking = (scoreData) => {
  try {
    const rankings = loadRankings()

    // 새 점수 추가
    rankings.push({
      nickname: scoreData.nickname,
      level: scoreData.level,
      score: scoreData.score,
      wpm: scoreData.wpm,
      accuracy: scoreData.accuracy,
      timestamp: new Date().toISOString()
    })

    // 점수 기준으로 내림차순 정렬
    rankings.sort((a, b) => b.score - a.score)

    // 상위 10명만 유지
    const top10 = rankings.slice(0, 10)

    localStorage.setItem(STORAGE_KEYS.RANKINGS, JSON.stringify(top10))
    return true
  } catch (error) {
    console.error('랭킹 저장 실패:', error)
    return false
  }
}

/**
 * 랭킹 데이터 불러오기
 * @returns {Array} 랭킹 배열
 */
export const loadRankings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RANKINGS)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('랭킹 데이터 불러오기 실패:', error)
    return []
  }
}

/**
 * 랭킹 데이터 초기화
 */
export const resetRankings = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RANKINGS)
    return true
  } catch (error) {
    console.error('랭킹 초기화 실패:', error)
    return false
  }
}

// ========== 닉네임 관리 ==========

/**
 * 닉네임 저장
 * @param {string} nickname - 닉네임
 */
export const saveNickname = (nickname) => {
  try {
    localStorage.setItem(STORAGE_KEYS.NICKNAME, nickname)
    return true
  } catch (error) {
    console.error('닉네임 저장 실패:', error)
    return false
  }
}

/**
 * 닉네임 불러오기
 * @returns {string|null} 닉네임 또는 null
 */
export const loadNickname = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.NICKNAME)
  } catch (error) {
    console.error('닉네임 불러오기 실패:', error)
    return null
  }
}

/**
 * 닉네임 삭제
 */
export const removeNickname = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.NICKNAME)
    return true
  } catch (error) {
    console.error('닉네임 삭제 실패:', error)
    return false
  }
}

// ========== 설정 관리 ==========

/**
 * 설정 저장
 * @param {Object} settings - 설정 객체
 */
export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
    return true
  } catch (error) {
    console.error('설정 저장 실패:', error)
    return false
  }
}

/**
 * 설정 불러오기
 * @returns {Object} 설정 객체 또는 기본값
 */
export const loadSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    return data ? JSON.parse(data) : {
      soundEnabled: true,
      difficulty: 'normal'
    }
  } catch (error) {
    console.error('설정 불러오기 실패:', error)
    return {
      soundEnabled: true,
      difficulty: 'normal'
    }
  }
}

// ========== 인벤토리 관리 ==========

/**
 * 인벤토리에 아이템 추가
 * @param {Object} item - 아이템 객체
 */
export const addItemToInventory = (item) => {
  try {
    const inventory = loadInventory()
    const newItem = {
      id: Date.now(),
      itemId: item.id,
      name: item.name,
      type: item.type,
      price: item.price,
      stats: item.stats,
      purchasedAt: new Date().toISOString()
    }
    inventory.push(newItem)
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory))
    return true
  } catch (error) {
    console.error('아이템 추가 실패:', error)
    return false
  }
}

/**
 * 인벤토리 불러오기
 * @returns {Array} 인벤토리 배열
 */
export const loadInventory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INVENTORY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('인벤토리 불러오기 실패:', error)
    return []
  }
}

/**
 * 특정 타입의 아이템만 가져오기
 * @param {string} type - 아이템 타입 (weapon, armor 등)
 * @returns {Array} 필터링된 아이템 배열
 */
export const getItemsByType = (type) => {
  const inventory = loadInventory()
  return inventory.filter(item => item.type === type)
}

/**
 * 인벤토리 초기화
 */
export const resetInventory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.INVENTORY)
    return true
  } catch (error) {
    console.error('인벤토리 초기화 실패:', error)
    return false
  }
}

// ========== 전체 데이터 관리 ==========

/**
 * 모든 데이터 초기화
 */
export const resetAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error('전체 데이터 초기화 실패:', error)
    return false
  }
}

/**
 * 저장소 사용량 확인 (대략적)
 * @returns {number} KB 단위 사용량
 */
export const getStorageSize = () => {
  try {
    let total = 0
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key)
      if (item) {
        total += item.length + key.length
      }
    })
    return (total / 1024).toFixed(2) // KB 단위로 반환
  } catch (error) {
    console.error('저장소 크기 확인 실패:', error)
    return 0
  }
}

/**
 * 데이터 내보내기 (JSON)
 * @returns {Object} 모든 저장된 데이터
 */
export const exportData = () => {
  try {
    const data = {}
    Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
      const item = localStorage.getItem(key)
      if (item) {
        data[name] = JSON.parse(item)
      }
    })
    return data
  } catch (error) {
    console.error('데이터 내보내기 실패:', error)
    return {}
  }
}

/**
 * 데이터 가져오기 (JSON)
 * @param {Object} data - 가져올 데이터
 */
export const importData = (data) => {
  try {
    Object.entries(data).forEach(([name, value]) => {
      const key = STORAGE_KEYS[name]
      if (key) {
        localStorage.setItem(key, JSON.stringify(value))
      }
    })
    return true
  } catch (error) {
    console.error('데이터 가져오기 실패:', error)
    return false
  }
}
