package com.typingrpg.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 아이템 구매 요청을 위한 DTO 클래스
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseRequest {
    @NotNull(message = "아이템 ID는 필수입니다.")
    private Long itemId;
}
