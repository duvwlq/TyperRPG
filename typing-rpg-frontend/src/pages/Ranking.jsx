/* ============================================
   Ranking.jsx - 픽셀 RPG 스타일 랭킹 페이지 (API 연동)
   ============================================ */

import { useState, useEffect } from 'react';
import { api } from '../api/client';
import './Ranking.css';

function Ranking() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRankings();
  }, []);

  const loadRankings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getRankings();
      // 순위 번호 추가
      const rankingsWithNumber = data.map((item, index) => ({
        ...item,
        rank: index + 1
      }));
      setRankings(rankingsWithNumber);
    } catch (err) {
      console.error('랭킹 로드 실패:', err);
      setError('랭킹을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 메달 색상
  const getMedalColor = (rank) => {
    switch (rank) {
      case 1: return '#FFD700'; // 금메달
      case 2: return '#C0C0C0'; // 은메달
      case 3: return '#CD7F32'; // 동메달
      default: return '#9aa39c';
    }
  };

  // 메달 이모지
  const getMedalEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return rank;
    }
  };

  return (
    <div className="pixel-ranking-container">
      <div className="pixel-ranking-wrapper">
        <div className="pixel-ranking-card">
          {/* 제목 */}
          <h1 className="pixel-ranking-title">RANKING</h1>
          <div className="pixel-ranking-subtitle">전체 순위</div>

          {/* 로딩 중 */}
          {loading && (
            <div className="pixel-ranking-empty">
              랭킹을 불러오는 중...
            </div>
          )}

          {/* 에러 */}
          {error && (
            <div className="pixel-ranking-empty" style={{ color: '#ff6b6b' }}>
              {error}
            </div>
          )}

          {/* 랭킹 리스트 */}
          {!loading && !error && rankings.length > 0 && (
            <div className="pixel-ranking-list">
              {rankings.map((user) => (
                <div
                  key={user.id}
                  className={`pixel-ranking-item ${user.rank <= 3 ? 'top-rank' : ''}`}
                >
                  {/* 순위 */}
                  <div
                    className="pixel-rank-number"
                    style={{ color: getMedalColor(user.rank) }}
                  >
                    {getMedalEmoji(user.rank)}
                  </div>

                  {/* 닉네임 */}
                  <div className="pixel-rank-nickname">{user.nickname}</div>

                  {/* 레벨 */}
                  <div className="pixel-rank-level">Lv.{user.level}</div>

                  {/* 점수 */}
                  <div className="pixel-rank-score">{user.score.toLocaleString()}</div>

                  {/* WPM */}
                  <div className="pixel-rank-wpm">{Math.round(user.wpm)} WPM</div>
                </div>
              ))}
            </div>
          )}

          {/* 랭킹이 없을 때 */}
          {!loading && !error && rankings.length === 0 && (
            <div className="pixel-ranking-empty">
              아직 등록된 랭킹이 없습니다.<br />
              게임을 플레이하고 첫 랭커가 되어보세요!
            </div>
          )}

          {/* 하단 정보 */}
          <div className="pixel-ranking-footer">
            상위 10명의 점수가 표시됩니다
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
