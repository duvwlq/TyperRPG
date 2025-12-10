/* ============================================
   GameContext.jsx - 게임 전역 상태 관리 (API 연동)
   ============================================ */

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { api } from '../api/client';

// Context 생성
const GameContext = createContext();

/**
 * GameProvider - 게임 상태를 제공하는 Provider 컴포넌트
 * API를 통해 백엔드와 연동하여 데이터를 관리합니다.
 */
export function GameProvider({ children }) {
  // ========== 상태 ==========
  const [player, setPlayer] = useState(null);
  const [nickname, setNicknameState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ========== 초기화 ==========

  useEffect(() => {
    const savedNickname = localStorage.getItem('typingRpg_nickname');
    if (savedNickname) {
      loadPlayer(savedNickname);
    } else {
      // 닉네임이 없으면 기본 게스트 플레이어 생성 (오프라인 모드)
      setPlayer({
        nickname: 'Guest',
        level: 1,
        exp: 0,
        hp: 100,
        maxHp: 100,
        atk: 10,
        gold: 0,
        score: 0
      });
      setLoading(false);
    }
  }, []);

  /**
   * 플레이어 데이터를 로드합니다.
   * @param {string} nick - 플레이어 닉네임
   */
  const loadPlayer = useCallback(async (nick) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getPlayer(nick);
      setPlayer(data);
      setNicknameState(nick);
    } catch (err) {
      console.error('플레이어 로드 실패:', err);
      setError(err.message);

      // API 실패 시 기본 게스트 플레이어 생성 (오프라인 모드)
      setPlayer({
        nickname: 'Guest',
        level: 1,
        exp: 0,
        hp: 100,
        maxHp: 100,
        atk: 10,
        gold: 0,
        score: 0
      });
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 닉네임을 설정하고 플레이어를 로드합니다.
   * @param {string} nick - 새 닉네임
   */
  const setNickname = useCallback(async (nick) => {
    localStorage.setItem('typingRpg_nickname', nick);
    await loadPlayer(nick);
  }, [loadPlayer]);

  /**
   * 플레이어 정보를 새로고침합니다.
   */
  const refreshPlayer = useCallback(async () => {
    if (nickname) {
      await loadPlayer(nickname);
    }
  }, [nickname, loadPlayer]);

  /**
   * 경험치와 골드를 업데이트합니다.
   * @param {number} exp - 추가할 경험치
   * @param {number} gold - 추가할 골드
   */
  const updateStats = useCallback(async (exp, gold) => {
    try {
      const updated = await api.updatePlayerStats(nickname, exp, gold);
      setPlayer(updated);
      return updated;
    } catch (err) {
      console.error('스탯 업데이트 실패:', err);
      throw err;
    }
  }, [nickname]);

  /**
   * 게임 점수를 저장합니다.
   * @param {Object} scoreData - 게임 점수 데이터
   */
  const saveGameScore = useCallback(async (scoreData) => {
    try {
      await api.saveScore(nickname, scoreData);
      // 점수 저장 후 플레이어 정보 새로고침
      await refreshPlayer();
    } catch (err) {
      console.error('점수 저장 실패:', err);
      throw err;
    }
  }, [nickname, refreshPlayer]);

  /**
   * 아이템을 구매합니다.
   * @param {number} itemId - 구매할 아이템 ID
   */
  const purchaseItem = useCallback(async (itemId) => {
    try {
      await api.purchaseItem(nickname, itemId);
      // 구매 후 플레이어 정보 새로고침
      await refreshPlayer();
    } catch (err) {
      console.error('아이템 구매 실패:', err);
      throw err;
    }
  }, [nickname, refreshPlayer]);

  // ========== 로컬 게임 플레이 함수 (즉시 반영) ==========

  /**
   * 경험치 획득 (로컬 상태 업데이트)
   */
  const gainExp = useCallback((amount) => {
    if (!player) return;

    setPlayer(prev => {
      const newExp = prev.exp + amount;
      const expForNextLevel = prev.level * 100;

      if (newExp >= expForNextLevel) {
        // 레벨업
        return {
          ...prev,
          level: prev.level + 1,
          exp: newExp - expForNextLevel,
          maxHp: prev.maxHp + 20,
          hp: prev.maxHp + 20,
          atk: prev.atk + 5
        };
      }

      return { ...prev, exp: newExp };
    });
  }, [player]);

  /**
   * 골드 획득 (로컬 상태 업데이트)
   */
  const gainGold = useCallback((amount) => {
    if (!player) return;
    setPlayer(prev => ({ ...prev, gold: prev.gold + amount }));
  }, [player]);

  /**
   * 데미지 받기 (로컬 상태 업데이트)
   */
  const takeDamage = useCallback((amount) => {
    if (!player) return;
    setPlayer(prev => ({ ...prev, hp: Math.max(0, prev.hp - amount) }));
  }, [player]);

  /**
   * HP 회복 (로컬 상태 업데이트)
   */
  const healHp = useCallback(() => {
    if (!player) return;
    setPlayer(prev => ({ ...prev, hp: prev.maxHp }));
  }, [player]);

  /**
   * 점수 추가 (로컬 상태 업데이트)
   */
  const addScore = useCallback((amount) => {
    if (!player) return;
    setPlayer(prev => ({ ...prev, score: (prev.score || 0) + amount }));
  }, [player]);

  // ========== Context 값 ==========

  const value = useMemo(() => ({
    // 상태
    player,
    nickname,
    loading,
    error,

    // API 함수
    setNickname,
    refreshPlayer,
    updateStats,
    saveGameScore,
    purchaseItem,

    // 로컬 게임 플레이 함수
    gainExp,
    gainGold,
    takeDamage,
    healHp,
    addScore,
  }), [player, nickname, loading, error, setNickname, refreshPlayer, updateStats, saveGameScore, purchaseItem, gainExp, gainGold, takeDamage, healHp, addScore]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

/**
 * useGame Hook - GameContext 사용
 *
 * 사용 예시:
 * const { player, nickname, updateStats, saveGameScore } = useGame()
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }

  return context;
}
