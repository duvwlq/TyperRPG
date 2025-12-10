package com.typingrpg.backend.service;

import com.typingrpg.backend.entity.Player;
import com.typingrpg.backend.exception.PlayerNotFoundException;
import com.typingrpg.backend.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;

    /**
     * 닉네임으로 플레이어를 조회하거나, 없으면 새로 생성합니다.
     *
     * @param nickname 플레이어 닉네임
     * @return 조회되거나 생성된 플레이어
     */
    @Transactional
    public Player getOrCreatePlayer(String nickname) {
        return playerRepository.findByNickname(nickname)
                .orElseGet(() -> {
                    Player newPlayer = new Player();
                    newPlayer.setNickname(nickname);
                    newPlayer.setLastLoginAt(LocalDateTime.now());
                    return playerRepository.save(newPlayer);
                });
    }

    /**
     * 플레이어의 경험치와 골드를 업데이트하고 레벨업 로직을 처리합니다.
     *
     * @param nickname 플레이어 닉네임
     * @param exp 추가할 경험치
     * @param gold 추가할 골드
     * @return 업데이트된 플레이어
     */
    @Transactional
    public Player updatePlayerStats(String nickname, Integer exp, Integer gold) {
        Player player = getOrCreatePlayer(nickname);

        // 경험치와 골드 추가
        player.setExp(player.getExp() + exp);
        player.setGold(player.getGold() + gold);
        player.setLastLoginAt(LocalDateTime.now());

        // 레벨업 로직
        int requiredExp = player.getLevel() * 100;
        while (player.getExp() >= requiredExp) {
            player.setExp(player.getExp() - requiredExp);
            player.setLevel(player.getLevel() + 1);
            player.setMaxHp(player.getMaxHp() + 10);
            player.setHp(player.getMaxHp()); // 레벨업 시 체력 전체 회복
            player.setAtk(player.getAtk() + 2);
            requiredExp = player.getLevel() * 100;
        }

        return playerRepository.save(player);
    }

    /**
     * ID로 플레이어를 조회합니다.
     *
     * @param id 플레이어 ID
     * @return 조회된 플레이어
     * @throws PlayerNotFoundException 플레이어를 찾을 수 없을 때
     */
    @Transactional(readOnly = true)
    public Player getPlayerById(Long id) {
        return playerRepository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException("플레이어를 찾을 수 없습니다."));
    }
}
