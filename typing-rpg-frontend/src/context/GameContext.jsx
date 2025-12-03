/* ============================================
   GameContext.jsx - 게임 전역 상태 관리
   ============================================ */

import { createContext, useContext, useState } from 'react'

// Context 생성
const GameContext = createContext()

/**
 * GameProvider - 게임 상태를 제공하는 Provider 컴포넌트
 *
 * 앱 전체에서 플레이어 정보, 인벤토리 등을 공유
 */
export function GameProvider({ children }) {
  // ========== 플레이어 상태 ==========

  const [player, setPlayer] = useState({
    nickname: 'Guest',       // 닉네임 (나중에 입력받음)
    level: 1,                // 레벨
    exp: 0,                  // 현재 경험치
    gold: 0,                 // 보유 골드
    hp: 100,                 // 현재 체력
    maxHp: 100,              // 최대 체력
    atk: 10,                 // 공격력
    totalScore: 0,           // 누적 점수
    gamesPlayed: 0           // 플레이한 게임 수
  })

  // ========== 인벤토리 상태 ==========

  const [inventory, setInventory] = useState([])

  // ========== 플레이어 액션 함수들 ==========

  /**
   * 닉네임 설정
   */
  const setNickname = (nickname) => {
    setPlayer(prev => ({
      ...prev,
      nickname
    }))
  }

  /**
   * 경험치 획득 (레벨업 자동 처리)
   *
   * @param {number} exp - 획득할 경험치
   */
  const gainExp = (exp) => {
    setPlayer(prev => {
      let newExp = prev.exp + exp
      let newLevel = prev.level
      let newMaxHp = prev.maxHp
      let newAtk = prev.atk

      // 레벨업 체크 (레벨당 필요 경험치 = 레벨 * 100)
      while (newExp >= newLevel * 100) {
        newExp -= newLevel * 100  // 경험치 차감
        newLevel += 1             // 레벨 업

        // 레벨업 시 스탯 증가
        newMaxHp += 10            // 최대 체력 +10
        newAtk += 2               // 공격력 +2
      }

      return {
        ...prev,
        exp: newExp,
        level: newLevel,
        maxHp: newMaxHp,
        atk: newAtk,
        hp: newMaxHp  // 레벨업 시 체력 완전 회복
      }
    })
  }

  /**
   * 골드 획득
   *
   * @param {number} gold - 획득할 골드
   */
  const gainGold = (gold) => {
    setPlayer(prev => ({
      ...prev,
      gold: prev.gold + gold
    }))
  }

  /**
   * 골드 소비 (상점 구매 등)
   *
   * @param {number} gold - 소비할 골드
   * @returns {boolean} 성공 여부
   */
  const spendGold = (gold) => {
    if (player.gold < gold) {
      return false  // 골드 부족
    }

    setPlayer(prev => ({
      ...prev,
      gold: prev.gold - gold
    }))

    return true
  }

  /**
   * 체력 회복
   *
   * @param {number} amount - 회복할 양 (null이면 전체 회복)
   */
  const healHp = (amount = null) => {
    setPlayer(prev => ({
      ...prev,
      hp: amount === null ? prev.maxHp : Math.min(prev.hp + amount, prev.maxHp)
    }))
  }

  /**
   * 데미지 받기
   *
   * @param {number} damage - 받을 데미지
   */
  const takeDamage = (damage) => {
    setPlayer(prev => ({
      ...prev,
      hp: Math.max(prev.hp - damage, 0)  // 최소 0
    }))
  }

  /**
   * 점수 추가
   *
   * @param {number} score - 추가할 점수
   */
  const addScore = (score) => {
    setPlayer(prev => ({
      ...prev,
      totalScore: prev.totalScore + score,
      gamesPlayed: prev.gamesPlayed + 1
    }))
  }

  /**
   * 스탯 영구 증가 (아이템 구매 시)
   *
   * @param {object} stats - { atk: 5, maxHp: 20 } 형태
   */
  const increaseStats = (stats) => {
    setPlayer(prev => ({
      ...prev,
      atk: prev.atk + (stats.atk || 0),
      maxHp: prev.maxHp + (stats.maxHp || 0),
      hp: prev.hp + (stats.maxHp || 0)  // 최대 체력 증가 시 현재 체력도 증가
    }))
  }

  // ========== 인벤토리 함수들 ==========

  /**
   * 아이템 추가
   *
   * @param {object} item - 아이템 객체
   */
  const addItem = (item) => {
    setInventory(prev => [...prev, item])
  }

  /**
   * 아이템 제거
   *
   * @param {number} itemId - 아이템 ID
   */
  const removeItem = (itemId) => {
    setInventory(prev => prev.filter(item => item.id !== itemId))
  }

  // ========== Context 값 ==========

  const value = {
    // 상태
    player,
    inventory,

    // 플레이어 함수
    setNickname,
    gainExp,
    gainGold,
    spendGold,
    healHp,
    takeDamage,
    addScore,
    increaseStats,

    // 인벤토리 함수
    addItem,
    removeItem
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

/**
 * useGame Hook - GameContext 사용
 *
 * 사용 예시:
 * const { player, gainExp, gainGold } = useGame()
 */
export function useGame() {
  const context = useContext(GameContext)

  if (!context) {
    throw new Error('useGame must be used within GameProvider')
  }

  return context
}

export default GameContext
