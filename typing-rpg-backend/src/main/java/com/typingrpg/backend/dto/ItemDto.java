package com.typingrpg.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 아이템 정보 전송을 위한 DTO 클래스
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {
    private Long id;
    private String name;
    private String type;
    private Integer price;
    private Integer atkBonus;
    private Integer hpBonus;
    private String description;
    private String icon;
}
