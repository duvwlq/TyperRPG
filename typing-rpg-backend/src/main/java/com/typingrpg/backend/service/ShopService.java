package com.typingrpg.backend.service;

import com.typingrpg.backend.entity.Item;
import com.typingrpg.backend.entity.Player;
import com.typingrpg.backend.entity.PlayerItem;
import com.typingrpg.backend.exception.InsufficientGoldException;
import com.typingrpg.backend.exception.ItemNotFoundException;
import com.typingrpg.backend.exception.PlayerNotFoundException;
import com.typingrpg.backend.repository.ItemRepository;
import com.typingrpg.backend.repository.PlayerItemRepository;
import com.typingrpg.backend.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 상점 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class ShopService {

    private final ItemRepository itemRepository;
    private final PlayerItemRepository playerItemRepository;
    private final PlayerRepository playerRepository;

    /**
     * 모든 아이템을 조회합니다.
     *
     * @return 전체 아이템 리스트
     */
    @Transactional(readOnly = true)
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    /**
     * 특정 타입의 아이템을 조회합니다.
     *
     * @param type 아이템 타입 (weapon, armor)
     * @return 해당 타입의 아이템 리스트
     */
    @Transactional(readOnly = true)
    public List<Item> getItemsByType(String type) {
        return itemRepository.findByType(type);
    }

    /**
     * 아이템을 구매하고 플레이어의 스탯을 업데이트합니다.
     *
     * @param nickname 플레이어 닉네임
     * @param itemId 구매할 아이템 ID
     * @return 구매한 아이템 정보
     * @throws PlayerNotFoundException 플레이어를 찾을 수 없을 때
     * @throws ItemNotFoundException 아이템을 찾을 수 없을 때
     * @throws InsufficientGoldException 골드가 부족할 때
     */
    @Transactional
    public PlayerItem purchaseItem(String nickname, Long itemId) {
        Player player = playerRepository.findByNickname(nickname)
                .orElseThrow(() -> new PlayerNotFoundException("플레이어를 찾을 수 없습니다."));

        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ItemNotFoundException("아이템을 찾을 수 없습니다."));

        if (player.getGold() < item.getPrice()) {
            throw new InsufficientGoldException("골드가 부족합니다.");
        }

        // 골드 차감
        player.setGold(player.getGold() - item.getPrice());

        // 스탯 적용
        player.setAtk(player.getAtk() + item.getAtkBonus());
        player.setMaxHp(player.getMaxHp() + item.getHpBonus());
        player.setHp(player.getMaxHp()); // HP 최대치로 회복

        playerRepository.save(player);

        // 인벤토리에 추가
        PlayerItem playerItem = new PlayerItem();
        playerItem.setPlayer(player);
        playerItem.setItem(item);

        return playerItemRepository.save(playerItem);
    }

    /**
     * 플레이어의 인벤토리를 조회합니다.
     *
     * @param nickname 플레이어 닉네임
     * @return 플레이어의 아이템 리스트
     * @throws PlayerNotFoundException 플레이어를 찾을 수 없을 때
     */
    @Transactional(readOnly = true)
    public List<PlayerItem> getPlayerInventory(String nickname) {
        Player player = playerRepository.findByNickname(nickname)
                .orElseThrow(() -> new PlayerNotFoundException("플레이어를 찾을 수 없습니다."));

        return playerItemRepository.findByPlayerId(player.getId());
    }
}
