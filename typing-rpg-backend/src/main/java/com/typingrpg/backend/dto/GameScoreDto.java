package com.typingrpg.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class GameScoreDto {
    private Long id;
    private String nickname;
    private Integer level;

    @NotNull(message = "콘텐츠 ID는 필수입니다")
    private Integer contentId;

    @NotNull(message = "점수는 필수입니다")
    private Integer score;

    @NotNull(message = "WPM은 필수입니다")
    private Double wpm;

    @NotNull(message = "정확도는 필수입니다")
    private Double accuracy;

    @NotNull(message = "처치한 몬스터 수는 필수입니다")
    private Integer monstersDefeated;

    @NotNull(message = "승리 여부는 필수입니다")
    private Boolean isWin;

    private LocalDateTime playedAt;
}
