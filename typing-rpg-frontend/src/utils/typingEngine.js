/* ============================================
   typingEngine.js - 타이핑 게임 핵심 로직
   ============================================ */

/**
 * WPM (Words Per Minute) 계산
 *
 * @param {number} correctChars - 정확히 입력한 글자 수
 * @param {number} timeInSeconds - 경과 시간 (초 단위)
 * @returns {number} WPM 값 (소수점 1자리)
 *
 * 계산 방식:
 * - 1단어 = 5글자로 가정 (표준 WPM 계산법)
 * - WPM = (글자 수 / 5) / (시간 / 60)
 */
export function calculateWPM(correctChars, timeInSeconds) {
  // 시간이 0이면 WPM은 0
  if (timeInSeconds === 0) return 0

  // 분 단위로 변환
  const minutes = timeInSeconds / 60

  // WPM 계산 (5글자 = 1단어)
  const words = correctChars / 5
  const wpm = words / minutes

  // 소수점 1자리로 반올림
  return Math.round(wpm * 10) / 10
}

/**
 * 정확도 (Accuracy) 계산
 *
 * @param {number} correctChars - 정확히 입력한 글자 수
 * @param {number} totalChars - 전체 입력한 글자 수
 * @returns {number} 정확도 퍼센트 (0-100, 소수점 1자리)
 *
 * 계산 방식:
 * - 정확도 = (맞은 글자 / 전체 글자) * 100
 */
export function calculateAccuracy(correctChars, totalChars) {
  // 전체 글자가 0이면 100% (아직 입력 안 함)
  if (totalChars === 0) return 100

  // 정확도 계산
  const accuracy = (correctChars / totalChars) * 100

  // 소수점 1자리로 반올림
  return Math.round(accuracy * 10) / 10
}

/**
 * 입력된 키가 정답인지 확인
 *
 * @param {string} input - 현재까지 입력한 문자열
 * @param {string} target - 목표 문자열
 * @returns {object} 검증 결과
 *   - isCorrect: 현재 입력이 정답인지
 *   - isComplete: 문장을 완성했는지
 *   - nextChar: 다음에 입력해야 할 문자
 */
export function validateInput(input, target) {
  // 입력이 목표보다 길면 오답
  if (input.length > target.length) {
    return {
      isCorrect: false,
      isComplete: false,
      nextChar: ''
    }
  }

  // 현재까지 입력이 목표 문자열의 시작 부분과 일치하는지 확인
  const isCorrect = target.startsWith(input)

  // 완성 여부 확인
  const isComplete = input === target

  // 다음 입력해야 할 문자
  const nextChar = isComplete ? '' : target[input.length]

  return {
    isCorrect,
    isComplete,
    nextChar
  }
}

/**
 * 텍스트를 글자 단위로 분리하고 각 글자의 상태를 판단
 *
 * @param {string} input - 현재까지 입력한 문자열
 * @param {string} target - 목표 문자열
 * @returns {array} 각 글자의 정보 배열
 *   - char: 글자
 *   - status: 'correct' | 'wrong' | 'pending'
 *   - index: 인덱스
 */
export function getCharacterStatus(input, target) {
  // 목표 문자열을 글자 단위로 분리
  const targetChars = target.split('')

  // 각 글자의 상태 판단
  return targetChars.map((char, index) => {
    let status = 'pending' // 기본값: 아직 입력 안 함

    if (index < input.length) {
      // 이미 입력된 글자인 경우
      if (input[index] === char) {
        status = 'correct'   // 정답
      } else {
        status = 'wrong' // 오답
      }
    }

    return {
      char,
      status,
      index
    }
  })
}

/**
 * 점수 계산
 *
 * @param {number} wpm - WPM 값
 * @param {number} accuracy - 정확도 (0-100)
 * @param {number} sentenceCount - 완료한 문장 수
 * @returns {number} 총 점수
 *
 * 계산 방식:
 * - 기본 점수 = WPM * 10
 * - 정확도 보너스 = 기본 점수 * (정확도 / 100)
 * - 문장 보너스 = 문장 수 * 50
 */
export function calculateScore(wpm, accuracy, sentenceCount) {
  // 기본 점수 (WPM 기반)
  const baseScore = wpm * 10

  // 정확도 보너스 (정확도가 높을수록 점수 증가)
  const accuracyBonus = baseScore * (accuracy / 100)

  // 문장 완료 보너스
  const sentenceBonus = sentenceCount * 50

  // 총 점수 (정수로 반올림)
  const totalScore = Math.round(baseScore + accuracyBonus + sentenceBonus)

  return totalScore
}

/**
 * 데미지 계산 (정답 시 몬스터에게 주는 데미지)
 *
 * @param {number} playerAtk - 플레이어 공격력
 * @param {number} accuracy - 현재 정확도 (0-100)
 * @param {number} wpm - 현재 WPM (Words Per Minute)
 * @returns {number} 데미지 값
 *
 * 계산 방식:
 * - 기본 데미지 = (WPM / 5) * 플레이어 공격력
 * - 정확도 배수 = accuracy / 100
 * - 최종 데미지 = 기본 데미지 * 정확도 배수
 * - WPM이 높을수록, 정확도가 높을수록 더 큰 데미지
 */
export function calculateDamage(playerAtk, accuracy, wpm = 0) {
  // WPM이 0이면 최소 데미지 (1)
  if (wpm === 0) {
    return 1
  }

  // 기본 데미지 = (WPM / 5) * 플레이어 공격력
  // WPM 50 기준으로 10배율, WPM 100이면 20배율
  const baseDamage = (wpm / 5) * playerAtk

  // 정확도 배수 (0.0 ~ 1.0)
  const accuracyMultiplier = accuracy / 100

  // 최종 데미지 계산
  let finalDamage = baseDamage * accuracyMultiplier

  // 정확도 보너스: 95% 이상이면 +20% 추가 데미지
  if (accuracy >= 95) {
    finalDamage = finalDamage * 1.2
  }

  // 최소 데미지는 1
  return Math.max(1, Math.round(finalDamage))
}

/**
 * 경험치 계산 (레벨업 필요 경험치)
 *
 * @param {number} level - 현재 레벨
 * @returns {number} 다음 레벨까지 필요한 경험치
 *
 * 계산 방식:
 * - 필요 경험치 = 현재 레벨 * 100
 */
export function getRequiredExp(level) {
  return level * 100
}
