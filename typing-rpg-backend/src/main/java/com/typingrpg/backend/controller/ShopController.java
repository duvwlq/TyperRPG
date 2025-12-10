package com.typingrpg.backend.controller;

import com.typingrpg.backend.dto.ApiResponse;
import com.typingrpg.backend.dto.ItemDto;
import com.typingrpg.backend.dto.PurchaseRequest;
import com.typingrpg.backend.entity.Item;
import com.typingrpg.backend.entity.PlayerItem;
import com.typingrpg.backend.service.ShopService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 상점 관련 REST API 컨트롤러
 */
@RestController
@RequestMapping("/api/shop")
@RequiredArgsConstructor
public class ShopController {

    private final ShopService shopService;

    /**
     * 모든 아이템을 조회합니다.
     *
     * @return 전체 아이템 리스트
     */
    @GetMapping("/items")
    public ResponseEntity<ApiResponse<List<ItemDto>>> getAllItems() {
        List<Item> items = shopService.getAllItems();
        List<ItemDto> dtos = items.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    /**
     * 특정 타입의 아이템을 조회합니다.
     *
     * @param type 아이템 타입 (weapon, armor)
     * @return 해당 타입의 아이템 리스트
     */
    @GetMapping("/items/type/{type}")
    public ResponseEntity<ApiResponse<List<ItemDto>>> getItemsByType(@PathVariable String type) {
        List<Item> items = shopService.getItemsByType(type);
        List<ItemDto> dtos = items.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    /**
     * 아이템을 구매합니다.
     *
     * @param nickname 플레이어 닉네임
     * @param request 구매 요청 (itemId)
     * @return 구매 완료 메시지
     */
    @PostMapping("/purchase/{nickname}")
    public ResponseEntity<ApiResponse<String>> purchaseItem(
            @PathVariable String nickname,
            @Valid @RequestBody PurchaseRequest request) {
        shopService.purchaseItem(nickname, request.getItemId());
        return ResponseEntity.ok(ApiResponse.success("구매 완료"));
    }

    /**
     * 플레이어의 인벤토리를 조회합니다.
     *
     * @param nickname 플레이어 닉네임
     * @return 플레이어의 아이템 리스트
     */
    @GetMapping("/inventory/{nickname}")
    public ResponseEntity<ApiResponse<List<ItemDto>>> getInventory(@PathVariable String nickname) {
        List<PlayerItem> inventory = shopService.getPlayerInventory(nickname);
        List<ItemDto> dtos = inventory.stream()
                .map(pi -> convertToDto(pi.getItem()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(dtos));
    }

    /**
     * Item 엔티티를 ItemDto로 변환합니다.
     *
     * @param item Item 엔티티
     * @return ItemDto
     */
    private ItemDto convertToDto(Item item) {
        ItemDto dto = new ItemDto();
        dto.setId(item.getId());
        dto.setName(item.getName());
        dto.setType(item.getType());
        dto.setPrice(item.getPrice());
        dto.setAtkBonus(item.getAtkBonus());
        dto.setHpBonus(item.getHpBonus());
        dto.setDescription(item.getDescription());
        dto.setIcon(item.getIcon());
        return dto;
    }
}
