/* ============================================
   GamePlayBoss.jsx - 픽셀 RPG 스타일 BOSS 전투 화면
   ============================================ */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGame } from '../context/GameContext'
import { getContentById } from '../data/sentences'
import { calculateScore, calculateDamage } from '../utils/typingEngine'
import useTyping from '../hooks/useTyping'

// 컴포넌트 import
import GameResult from '../components/GameResult'

import './GamePlayBoss.css'

function GamePlayBoss() {
  const { contentId } = useParams()
  const navigate = useNavigate()
  const { player, gainExp, gainGold, takeDamage, healHp, addScore } = useGame()

  // ========== 게임 데이터 ==========

  const [content, setContent] = useState(null)
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [monster, setMonster] = useState(null)
  const [completedSentences, setCompletedSentences] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [_victory, setVictory] = useState(false)
  const [result, setResult] = useState(null)

  // 타이머 (카운트다운, 60초)
  const [totalTime] = useState(60)
  const [remaining, setRemaining] = useState(60)
  const [started, setStarted] = useState(false)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)

  // 입력 상태
  const [inputValue, setInputValue] = useState('')
  const [isWrongInput, setIsWrongInput] = useState(false)
  const [_isComposing, setIsComposing] = useState(false)

  // ========== 초기화 ==========

  useEffect(() => {
    const loadedContent = getContentById(contentId)

    if (!loadedContent) {
      navigate('/content')
      return
    }

    setContent(loadedContent)

    // 몬스터 초기화
    setMonster({
      name: loadedContent.monster.name,
      hp: loadedContent.monster.hp,
      maxHp: loadedContent.monster.hp
    })

    // 플레이어 체력 완전 회복
    healHp()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [contentId, navigate]) // eslint-disable-line react-hooks/exhaustive-deps

  // ========== 타이핑 Hook ==========

  const currentSentence = content ? content.sentences[currentSentenceIndex] : ''

  // 순환 참조 방지를 위한 ref들
  const sentenceCompleteRef = useRef(null)
  const resetRef = useRef(null)

  const {
    input,
    elapsedTime,
    wpm,
    accuracy,
    errors,
    isComplete: _isComplete,
    characterStatus,
    handleKeyPress,
    setInputValue: setTypingInput,
    reset
  } = useTyping(currentSentence, (sentenceResult) => {
    // ref를 통해 실제 콜백 호출
    if (sentenceCompleteRef.current) {
      sentenceCompleteRef.current(sentenceResult)
    }
  })

  // ========== 게임 종료 ==========

  const endGame = useCallback((isVictory, finalStats) => {
    // 타이머 정지
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setGameOver(true)
    setVictory(isVictory)

    // 점수 계산
    const score = calculateScore(
      finalStats.wpm,
      finalStats.accuracy,
      completedSentences
    )

    // 승리 시 보상
    let expGained = 0
    let goldGained = 0
    let levelBefore = player.level

    if (isVictory) {
      expGained = content.monster.exp
      goldGained = content.monster.gold

      gainExp(expGained)
      gainGold(goldGained)
      addScore(score)
    }

    // 레벨업 확인
    const levelUp = player.level > levelBefore

    // 결과 데이터 설정
    setResult({
      victory: isVictory,
      score,
      wpm: finalStats.wpm,
      accuracy: finalStats.accuracy,
      exp: expGained,
      gold: goldGained,
      levelUp
    })
  }, [completedSentences, player.level, content, gainExp, gainGold, addScore])

  // ========== 문장 완료 처리 ==========

  const handleSentenceComplete = useCallback((sentenceResult) => {
    // 몬스터에게 데미지 (WPM 기반)
    const damage = calculateDamage(player.atk, sentenceResult.accuracy, sentenceResult.wpm)
    const newMonsterHp = Math.max(0, monster.hp - damage)

    setMonster(prev => ({
      ...prev,
      hp: newMonsterHp
    }))

    setCompletedSentences(prev => prev + 1)

    // 몬스터 처치 확인
    if (newMonsterHp <= 0) {
      endGame(true, sentenceResult)
      return
    }

    // 다음 문장으로
    if (currentSentenceIndex + 1 < content.sentences.length) {
      setTimeout(() => {
        setCurrentSentenceIndex(prev => prev + 1)
        setInputValue('')
        setIsWrongInput(false)
        setIsComposing(false)
        // ref를 통해 reset 호출 (순환 참조 방지)
        if (resetRef.current) {
          resetRef.current()
        }
      }, 300)
    } else {
      // 모든 문장 완료
      setTimeout(() => {
        endGame(true, sentenceResult)
      }, 300)
    }
  }, [player.atk, monster, endGame, currentSentenceIndex, content])  // reset 제거!

  // ref 업데이트 (useEffect에서 처리)
  useEffect(() => {
    resetRef.current = reset
    sentenceCompleteRef.current = handleSentenceComplete
  }, [reset, handleSentenceComplete])

  // ========== 타이머 시작 ==========

  const startTimer = () => {
    if (started) return
    setStarted(true)
    startTimeRef.current = Date.now()

    timerRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          // 시간 종료 - 패배
          clearInterval(timerRef.current)
          endGame(false, {
            wpm,
            accuracy,
            elapsedTime
          })
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // ========== CPM 계산 ==========

  const cpm = useMemo(() => {
    if (elapsedTime > 0) {
      const minutes = elapsedTime / 60
      const calculatedCpm = Math.round((input.length / minutes) * 10) / 10
      return calculatedCpm || 0
    }
    return 0
  }, [input, elapsedTime])

  // ========== 오타 시 HP 감소 ==========

  useEffect(() => {
    if (errors > 0 && !gameOver) {
      const errorDamage = 5
      takeDamage(errorDamage)

      // 플레이어 사망 확인
      if (player.hp - errorDamage <= 0) {
        endGame(false, {
          wpm,
          accuracy,
          elapsedTime
        })
      }
    }
  }, [errors]) // eslint-disable-line react-hooks/exhaustive-deps

  // ========== 다시 하기 ==========

  const handleRestart = () => {
    setGameOver(false)
    setVictory(false)
    setResult(null)
    setCurrentSentenceIndex(0)
    setCompletedSentences(0)
    setRemaining(totalTime)
    setStarted(false)
    setInputValue('')

    // 몬스터 리셋
    setMonster({
      name: content.monster.name,
      hp: content.monster.hp,
      maxHp: content.monster.hp
    })

    // 플레이어 회복
    healHp()

    // 타이핑 리셋
    reset()
  }

  // ========== 입력 처리 ==========

  const handleInputKeyDown = (e) => {
    // 첫 입력 시 타이머 시작
    if (!started) {
      startTimer()
    }

    // Enter 키 처리
    if (e.key === 'Enter') {
      e.preventDefault()
      return
    }

    // 타이핑 Hook에 전달
    handleKeyPress(e)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    // 한글 조합 중이 아닐 때만 useTyping에 전달 (nativeEvent.isComposing 체크)
    if (!e.nativeEvent.isComposing) {
      setTypingInput(value)
    }
  }

  // ========== 컨트롤 버튼 핸들러 ==========

  const handleHelp = () => {
    alert('타이핑으로 몬스터를 공격하세요!\n오타가 나면 HP가 감소합니다.')
  }

  const handleHome = () => {
    if (window.confirm('게임을 종료하고 홈으로 돌아가시겠습니까?')) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      navigate('/')
    }
  }

  const handleSettings = () => {
    alert('설정 기능은 개발 중입니다.')
  }

  // ========== 스테이지 클릭 (애니메이션) ==========

  const handleStageClick = () => {
    if (!started) {
      document.getElementById('pixel-input-field')?.focus()
      startTimer()
    }
  }

  // ========== 프로그레스 계산 ==========

  const progressPercent = currentSentence
    ? Math.round((input.length / currentSentence.length) * 100)
    : 0

  // MP 바 (프로그레스와 동일)
  const mpPercent = progressPercent

  // ========== 렌더링 ==========

  if (!content || !monster) {
    return <div className="pixel-loading">로딩 중...</div>
  }

  return (
    <div className="pixel-game-container">
      <div className="pixel-game-wrapper">
        <div className="pixel-game-card">
          {/* 상단 타이머 */}
          <div className="pixel-top-row">
            <div style={{ position: 'relative', width: '100%' }}>
                <div style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold' }}>
                    00:{String(remaining).padStart(2, '0')}
                </div>
              <div className="pixel-core-bar" aria-hidden="true"></div>
            </div>
          </div>

          {/* 메인 스크린 */}
          <div className="pixel-screen">
            {/* 스테이지 (게임 씬) */}
            <div className="pixel-stage" onClick={handleStageClick}>
              <div className="pixel-label-core">CORE</div>

              <div className="pixel-wrap">
                {/* 플레이어 (픽셀 아트 SVG) */}
                <div className="pixel-entity pixel-player">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    style={{ imageRendering: 'pixelated' }}
                  >
                    {/* 간단한 픽셀 스타일 캐릭터 */}
                    <rect x="3" y="2" width="18" height="20" fill="#dbe7e2" rx="3" />
                    <rect x="6" y="6" width="12" height="6" fill="#f3b6b3" />
                    <rect x="8" y="12" width="8" height="8" fill="#ffffff" />
                    <rect x="4" y="18" width="3" height="3" fill="#8aa47f" />
                    <rect x="17" y="18" width="3" height="3" fill="#8aa47f" />
                  </svg>
                </div>

                {/* 몬스터 (픽셀 아트 SVG) */}
                <div className="pixel-entity pixel-monster">
                  <svg
                    width="84"
                    height="72"
                    viewBox="0 0 36 30"
                    style={{ imageRendering: 'pixelated' }}
                  >
                    {/* 간단한 고블린 스타일 몬스터 */}
                    <rect x="3" y="6" width="30" height="20" rx="3" fill="#444a46" />
                    <rect x="6" y="9" width="8" height="6" fill="#2f3632" />
                    <rect x="22" y="9" width="8" height="6" fill="#2f3632" />
                    <circle cx="12" cy="14" r="1.2" fill="#aabfb4" />
                    <circle cx="24" cy="14" r="1.2" fill="#aabfb4" />
                    <rect x="12" y="20" width="12" height="3" fill="#39433f" />
                  </svg>
                </div>
              </div>

              {/* 땅 */}
              <div className="pixel-ground"></div>
            </div>

              {/* 하단 통계 한 줄 */}
              <div className="pixel-stats-inline">
                  <span>CPM: {Math.round(cpm)}</span>
                  <span>ACC: {Math.round(accuracy)}%</span>
                  <span>ERR: {errors}</span>
              </div>


              {/* 대화 박스 */}
            <div className="pixel-dialog">
              <div className="pixel-dialog-meta">
                - {content.title} [{currentSentenceIndex + 1}/{content.sentences.length}] -
              </div>

              {/* 문장 */}
              <div className="pixel-dialog-sentence">
                {characterStatus.map((charInfo, idx) => (
                  <span
                    key={idx}
                    className={
                      charInfo.status === 'correct'
                        ? 'pixel-char-correct'
                        : charInfo.status === 'wrong'
                        ? 'pixel-char-wrong'
                        : 'pixel-char-pending'
                    }
                  >
                    {currentSentence[idx]}
                  </span>
                ))}
              </div>

              {/* 입력 행 */}
              <div className="pixel-type-row">
                <input
                  id="pixel-input-field"
                  className={`pixel-input ${isWrongInput ? 'wrong' : ''}`}
                  placeholder="위 문장을 타이핑 하세요."
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={(e) => {
                    setIsComposing(false)
                    // 조합 완료 시 최종 값 전달
                    setTypingInput(e.target.value)
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  autoFocus
                />


              </div>
            </div>

            {/* 하단 행 */}
              {/* 하단 행 */}
              <div className="pixel-bottom-row">
                  {/* 캐릭터 HP 바 */}
                  <div className="pixel-hp-wrapper">
                      <div className="pixel-gage">
                          <div
                              className="pixel-gage-fill"
                              style={{ width: `${Math.round((player.hp / player.maxHp) * 100)}%`, background: 'var(--pixel-hp)' }}
                          ></div>
                      </div>
                  </div>

                  {/* 버튼 3개 */}
                  <div className="pixel-center-buttons">
                      <button className="pixel-btn" onClick={handleHelp}>?</button>
                      <button className="pixel-btn" onClick={handleHome}>⌂</button>
                      <button className="pixel-btn" onClick={handleSettings}>⚙</button>
                  </div>

                  {/* MP 바 */}
                  <div className="pixel-mp-wrapper">
                      <div className="pixel-mp-label"></div>
                      <div className="pixel-gage">
                          <div
                              className="pixel-gage-fill"
                              style={{ width: `${Math.min(100, mpPercent)}%`, background: 'var(--pixel-mp)' }}
                          ></div>
                      </div>
                  </div>
              </div>

          </div>
        </div>
      </div>

      {/* 결과 모달 */}
      {gameOver && result && (
        <GameResult
          result={result}
          onClose={() => navigate('/content')}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default GamePlayBoss
