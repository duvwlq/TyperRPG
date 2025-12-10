package com.typingrpg.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateStatsRequest {
    @NotNull(message = "경험치는 필수입니다")
    private Integer exp;

    @NotNull(message = "골드는 필수입니다")
    private Integer gold;
}
