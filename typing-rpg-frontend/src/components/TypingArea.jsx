/* ============================================
   TypingArea.jsx - 타이핑 입력 영역
   ============================================ */

import { useEffect, useRef } from 'react'
import './TypingArea.css'

/**
 * TypingArea - 타이핑 입력을 받고 표시하는 컴포넌트
 *
 * @param {string} targetText - 타이핑할 목표 문자열
 * @param {array} characterStatus - 각 글자의 상태 배열
 * @param {function} onKeyPress - 키 입력 핸들러
 * @param {string} input - 현재 입력 텍스트
 */
// eslint-disable-next-line no-unused-vars
function TypingArea({ targetText: _targetText, characterStatus, onKeyPress, input }) {
  // 입력 필드 참조 (자동 포커스용)
  const inputRef = useRef(null)

  // 컴포넌트 마운트 시 자동 포커스
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  /**
   * 키보드 입력 처리
   */
  const handleKeyDown = (e) => {
    // 한글 입력 중 중복 이벤트 방지
    if (e.nativeEvent.isComposing) return

    // Enter, Tab 등 특수키 기본 동작 방지
    if (['Enter', 'Tab'].includes(e.key)) {
      e.preventDefault()
    }

    // Backspace 또는 일반 문자만 처리
    if (e.key === 'Backspace' || e.key.length === 1) {
      onKeyPress(e.key)
    }
  }

  /**
   * 입력 필드 클릭 시 자동 포커스
   */
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="typing-area" onClick={handleClick}>
      {/* 안내 메시지 */}
      <div className="typing-instruction">
        아래 문장을 정확하게 입력하세요
      </div>

      {/* 타이핑 텍스트 표시 영역 */}
      <div className="typing-text">
        {characterStatus.map((charInfo, index) => (
          <span
            key={index}
            className={`typing-char typing-char-${charInfo.status}`}
          >
            {charInfo.char}
          </span>
        ))}
      </div>

      {/* 숨겨진 입력 필드 (실제 타이핑 입력을 받음) */}
      <input
        ref={inputRef}
        type="text"
        className="typing-input-hidden"
        value={input}
        onKeyDown={handleKeyDown}
        onChange={() => {}} // onChange 경고 방지 (onKeyDown에서 처리)
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      {/* 입력 안내 */}
      <div className="typing-hint">
        {input.length === 0 ? '클릭하여 타이핑을 시작하세요' : ''}
      </div>
    </div>
  )
}

export default TypingArea
