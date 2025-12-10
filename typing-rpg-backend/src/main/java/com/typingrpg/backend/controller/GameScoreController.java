package com.typingrpg.backend.controller;

import com.typingrpg.backend.dto.ApiResponse;
import com.typingrpg.backend.dto.GameScoreDto;
import com.typingrpg.backend.entity.GameScore;
import com.typingrpg.backend.service.GameScoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@RequiredArgsConstructor
public class GameScoreController {

    private final GameScoreService gameScoreService;

    /**
     * 게임 점수를 저장합니다.
     *
     * @param nickname 플레이어 닉네임
     * @param dto 게임 점수 데이터
     * @return 저장된 게임 점수
     */
    @PostMapping("/{nickname}")
    public ResponseEntity<ApiResponse<GameScoreDto>> saveScore(
            @PathVariable String nickname,
            @Valid @RequestBody GameScoreDto dto) {
        GameScore score = gameScoreService.saveScore(nickname, dto);
        GameScoreDto resultDto = convertToDto(score);
        return ResponseEntity.ok(ApiResponse.success(resultDto));
    }

    /**
     * 상위 10개의 랭킹을 조회합니다.
     *
     * @return 상위 10개 게임 점수 리스트
     */
    @GetMapping("/rankings")
    public ResponseEntity<ApiResponse<List<GameScoreDto>>> getRankings() {
        List<GameScoreDto> rankings = gameScoreService.getTop10Rankings();
        return ResponseEntity.ok(ApiResponse.success(rankings));
    }

    /**
     * 특정 플레이어의 게임 기록을 조회합니다.
     *
     * @param nickname 플레이어 닉네임
     * @return 플레이어의 게임 점수 리스트
     */
    @GetMapping("/player/{nickname}")
    public ResponseEntity<ApiResponse<List<GameScoreDto>>> getPlayerScores(
            @PathVariable String nickname) {
        List<GameScoreDto> scores = gameScoreService.getPlayerScores(nickname);
        return ResponseEntity.ok(ApiResponse.success(scores));
    }

    /**
     * GameScore 엔티티를 GameScoreDto로 변환합니다.
     *
     * @param score GameScore 엔티티
     * @return GameScoreDto
     */
    private GameScoreDto convertToDto(GameScore score) {
        GameScoreDto dto = new GameScoreDto();
        dto.setId(score.getId());
        dto.setNickname(score.getPlayer().getNickname());
        dto.setLevel(score.getPlayer().getLevel());
        dto.setContentId(score.getContentId());
        dto.setScore(score.getScore());
        dto.setWpm(score.getWpm());
        dto.setAccuracy(score.getAccuracy());
        dto.setMonstersDefeated(score.getMonstersDefeated());
        dto.setIsWin(score.getIsWin());
        dto.setPlayedAt(score.getPlayedAt());
        return dto;
    }
}
