/* ============================================
   useTyping.js - 타이핑 로직을 관리하는 Custom Hook
   ============================================ */

import { useState, useEffect, useRef } from 'react'
import {
  calculateWPM,
  calculateAccuracy,
  validateInput,
  getCharacterStatus
} from '../utils/typingEngine'

/**
 * useTyping Hook
 *
 * 타이핑 게임의 핵심 로직을 관리하는 Hook
 *
 * @param {string} targetText - 타이핑해야 할 목표 문자열
 * @param {function} onComplete - 문장 완료 시 실행할 콜백 함수
 * @returns {object} 타이핑 상태 및 함수들
 */
function useTyping(targetText, onComplete) {
  // ========== 상태 관리 ==========

  // 현재 입력한 텍스트
  const [input, setInput] = useState('')

  // 타이핑 시작 시간 (밀리초)
  const [startTime, setStartTime] = useState(null)

  // 경과 시간 (초)
  const [elapsedTime, setElapsedTime] = useState(0)

  // WPM (Words Per Minute)
  const [wpm, setWpm] = useState(0)

  // 정확도 (0-100)
  const [accuracy, setAccuracy] = useState(100)

  // 정확히 입력한 글자 수
  const [correctChars, setCorrectChars] = useState(0)

  // 전체 입력한 글자 수 (오답 포함)
  const [totalChars, setTotalChars] = useState(0)

  // 오타 횟수
  const [errors, setErrors] = useState(0)

  // 타이핑이 완료되었는지
  const [isComplete, setIsComplete] = useState(false)

  // 타이머 인터벌 참조 (useRef: 리렌더링 되어도 값 유지)
  const timerRef = useRef(null)

  // ========== 타이머 관리 ==========

  // 타이핑 시작 시 타이머 시작
  useEffect(() => {
    if (startTime && !isComplete) {
      // 1초마다 경과 시간 업데이트
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        setElapsedTime(elapsed)

        // WPM 계산 (매초 업데이트)
        const newWpm = calculateWPM(correctChars, elapsed)
        setWpm(newWpm)
      }, 1000)
    }

    // 컴포넌트 언마운트 또는 완료 시 타이머 정리
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [startTime, isComplete, correctChars])

  // ========== 입력 처리 함수 ==========

  /**
   * 키 입력 처리
   *
   * @param {string} key - 입력된 키
   */
  const handleKeyPress = (key) => {
    // 이미 완료된 경우 무시
    if (isComplete) return

    // 첫 입력 시 타이머 시작
    if (!startTime) {
      setStartTime(Date.now())
    }

    // Backspace 처리
    if (key === 'Backspace') {
      setInput(prev => prev.slice(0, -1))
      return
    }

    // 일반 문자 입력
    const newInput = input + key

    // 목표 문자열보다 길면 무시
    if (newInput.length > targetText.length) {
      return
    }

    // 입력 업데이트
    setInput(newInput)

    // 전체 입력 글자 수 증가
    setTotalChars(prev => prev + 1)

    // 입력 검증
    const validation = validateInput(newInput, targetText)

    if (validation.isCorrect) {
      // 정답인 경우
      setCorrectChars(prev => prev + 1)
    } else {
      // 오답인 경우
      setErrors(prev => prev + 1)
    }

    // 정확도 계산
    const newAccuracy = calculateAccuracy(correctChars + 1, totalChars + 1)
    setAccuracy(newAccuracy)

    // 완성 확인
    if (validation.isComplete) {
      setIsComplete(true)

      // 타이머 정지
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      // 완료 콜백 실행
      if (onComplete) {
        onComplete({
          input: newInput,
          elapsedTime,
          wpm,
          accuracy: newAccuracy,
          errors
        })
      }
    }
  }

  // ========== 입력 직접 설정 (복사-붙여넣기 대응) ==========

  /**
   * 입력 텍스트 직접 설정
   *
   * @param {string} value - 설정할 텍스트
   */
  const setInputValue = (value) => {
    // 이미 완료된 경우 무시
    if (isComplete) return

    // 첫 입력 시 타이머 시작
    if (!startTime && value.length > 0) {
      setStartTime(Date.now())
    }

    // 목표보다 길면 잘라냄
    const newInput = value.slice(0, targetText.length)

    // 입력 업데이트
    setInput(newInput)

    // 통계 계산
    let correct = 0
    let total = newInput.length
    let errorCount = 0

    for (let i = 0; i < newInput.length; i++) {
      if (newInput[i] === targetText[i]) {
        correct++
      } else {
        errorCount++
      }
    }

    setCorrectChars(correct)
    setTotalChars(total)
    setErrors(errorCount)

    // 정확도 계산
    const newAccuracy = calculateAccuracy(correct, total)
    setAccuracy(newAccuracy)

    // 완성 확인
    if (newInput === targetText) {
      setIsComplete(true)

      // 타이머 정지
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      // 완료 콜백 실행
      if (onComplete) {
        onComplete({
          input: newInput,
          elapsedTime,
          wpm,
          accuracy: newAccuracy,
          errors: errorCount
        })
      }
    }
  }

  // ========== 리셋 함수 ==========

  /**
   * 타이핑 상태 초기화
   */
  const reset = () => {
    setInput('')
    setStartTime(null)
    setElapsedTime(0)
    setWpm(0)
    setAccuracy(100)
    setCorrectChars(0)
    setTotalChars(0)
    setErrors(0)
    setIsComplete(false)

    // 타이머 정리
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // ========== 글자 상태 가져오기 ==========

  // 현재 입력 상태에 따른 각 글자의 상태
  const characterStatus = getCharacterStatus(input, targetText)

  // ========== 반환 값 ==========

  return {
    // 상태
    input,              // 현재 입력 텍스트
    elapsedTime,        // 경과 시간 (초)
    wpm,                // WPM
    accuracy,           // 정확도
    errors,             // 오타 횟수
    isComplete,         // 완료 여부
    characterStatus,    // 각 글자의 상태 배열

    // 함수
    handleKeyPress,     // 키 입력 처리
    setInputValue,      // 입력 직접 설정
    reset               // 리셋
  }
}

export default useTyping
