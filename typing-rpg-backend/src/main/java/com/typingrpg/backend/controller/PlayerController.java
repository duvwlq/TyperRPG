package com.typingrpg.backend.controller;

import com.typingrpg.backend.dto.ApiResponse;
import com.typingrpg.backend.dto.PlayerDto;
import com.typingrpg.backend.dto.UpdateStatsRequest;
import com.typingrpg.backend.entity.Player;
import com.typingrpg.backend.service.PlayerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    /**
     * 닉네임으로 플레이어를 조회하거나 생성합니다.
     *
     * @param nickname 플레이어 닉네임
     * @return 플레이어 정보
     */
    @GetMapping("/{nickname}")
    public ResponseEntity<ApiResponse<PlayerDto>> getPlayer(@PathVariable String nickname) {
        Player player = playerService.getOrCreatePlayer(nickname);
        PlayerDto dto = convertToDto(player);
        return ResponseEntity.ok(ApiResponse.success(dto));
    }

    /**
     * 플레이어의 경험치와 골드를 업데이트합니다.
     *
     * @param nickname 플레이어 닉네임
     * @param request 업데이트 요청 (exp, gold)
     * @return 업데이트된 플레이어 정보
     */
    @PostMapping("/{nickname}/update-stats")
    public ResponseEntity<ApiResponse<PlayerDto>> updateStats(
            @PathVariable String nickname,
            @Valid @RequestBody UpdateStatsRequest request) {
        Player player = playerService.updatePlayerStats(
                nickname, request.getExp(), request.getGold());
        PlayerDto dto = convertToDto(player);
        return ResponseEntity.ok(ApiResponse.success(dto));
    }

    /**
     * Player 엔티티를 PlayerDto로 변환합니다.
     *
     * @param player Player 엔티티
     * @return PlayerDto
     */
    private PlayerDto convertToDto(Player player) {
        PlayerDto dto = new PlayerDto();
        dto.setId(player.getId());
        dto.setNickname(player.getNickname());
        dto.setLevel(player.getLevel());
        dto.setExp(player.getExp());
        dto.setGold(player.getGold());
        dto.setHp(player.getHp());
        dto.setMaxHp(player.getMaxHp());
        dto.setAtk(player.getAtk());
        dto.setTotalScore(player.getTotalScore());
        dto.setGamesPlayed(player.getGamesPlayed());
        dto.setGamesWon(player.getGamesWon());
        return dto;
    }
}
