/**
 * TyperRPG API 클라이언트
 * 백엔드 API와 통신하기 위한 클라이언트 클래스
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

class ApiClient {
  /**
   * HTTP 요청을 수행하는 기본 메서드
   * @param {string} endpoint - API 엔드포인트
   * @param {Object} options - fetch 옵션
   * @returns {Promise<any>} API 응답 데이터
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || '요청 실패');
      }

      return data.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ==================== Player API ====================

  /**
   * 닉네임으로 플레이어를 조회하거나 생성합니다.
   * @param {string} nickname - 플레이어 닉네임
   * @returns {Promise<Object>} 플레이어 정보
   */
  async getPlayer(nickname) {
    return this.request(`/players/${nickname}`);
  }

  /**
   * 플레이어의 경험치와 골드를 업데이트합니다.
   * @param {string} nickname - 플레이어 닉네임
   * @param {number} exp - 추가할 경험치
   * @param {number} gold - 추가할 골드
   * @returns {Promise<Object>} 업데이트된 플레이어 정보
   */
  async updatePlayerStats(nickname, exp, gold) {
    return this.request(`/players/${nickname}/update-stats`, {
      method: 'POST',
      body: JSON.stringify({ exp, gold }),
    });
  }

  // ==================== Score API ====================

  /**
   * 게임 점수를 저장합니다.
   * @param {string} nickname - 플레이어 닉네임
   * @param {Object} scoreData - 게임 점수 데이터
   * @returns {Promise<Object>} 저장된 점수 정보
   */
  async saveScore(nickname, scoreData) {
    return this.request(`/scores/${nickname}`, {
      method: 'POST',
      body: JSON.stringify(scoreData),
    });
  }

  /**
   * 상위 10개의 랭킹을 조회합니다.
   * @returns {Promise<Array>} 랭킹 리스트
   */
  async getRankings() {
    return this.request('/scores/rankings');
  }

  /**
   * 특정 플레이어의 게임 기록을 조회합니다.
   * @param {string} nickname - 플레이어 닉네임
   * @returns {Promise<Array>} 게임 기록 리스트
   */
  async getPlayerScores(nickname) {
    return this.request(`/scores/player/${nickname}`);
  }

  // ==================== Shop API ====================

  /**
   * 모든 아이템을 조회합니다.
   * @returns {Promise<Array>} 아이템 리스트
   */
  async getItems() {
    return this.request('/shop/items');
  }

  /**
   * 특정 타입의 아이템을 조회합니다.
   * @param {string} type - 아이템 타입 (weapon, armor)
   * @returns {Promise<Array>} 아이템 리스트
   */
  async getItemsByType(type) {
    return this.request(`/shop/items/type/${type}`);
  }

  /**
   * 아이템을 구매합니다.
   * @param {string} nickname - 플레이어 닉네임
   * @param {number} itemId - 아이템 ID
   * @returns {Promise<string>} 구매 결과 메시지
   */
  async purchaseItem(nickname, itemId) {
    return this.request(`/shop/purchase/${nickname}`, {
      method: 'POST',
      body: JSON.stringify({ itemId }),
    });
  }

  /**
   * 플레이어의 인벤토리를 조회합니다.
   * @param {string} nickname - 플레이어 닉네임
   * @returns {Promise<Array>} 인벤토리 아이템 리스트
   */
  async getInventory(nickname) {
    return this.request(`/shop/inventory/${nickname}`);
  }
}

export const api = new ApiClient();
