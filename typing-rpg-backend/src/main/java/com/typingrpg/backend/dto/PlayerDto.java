package com.typingrpg.backend.dto;

import lombok.Data;

@Data
public class PlayerDto {
    private Long id;
    private String nickname;
    private Integer level;
    private Integer exp;
    private Integer gold;
    private Integer hp;
    private Integer maxHp;
    private Integer atk;
    private Integer totalScore;
    private Integer gamesPlayed;
    private Integer gamesWon;
}
