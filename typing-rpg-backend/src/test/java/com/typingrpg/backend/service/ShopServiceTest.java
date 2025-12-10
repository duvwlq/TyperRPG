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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

/**
 * ShopService 테스트
 */
@ExtendWith(MockitoExtension.class)
class ShopServiceTest {

    @Mock
    private ItemRepository itemRepository;

    @Mock
    private PlayerItemRepository playerItemRepository;

    @Mock
    private PlayerRepository playerRepository;

    @InjectMocks
    private ShopService shopService;

    private Player testPlayer;
    private Item testItem;

    @BeforeEach
    void setUp() {
        testPlayer = new Player();
        testPlayer.setId(1L);
        testPlayer.setNickname("TestPlayer");
        testPlayer.setGold(500);
        testPlayer.setAtk(10);
        testPlayer.setMaxHp(100);
        testPlayer.setHp(100);

        testItem = new Item();
        testItem.setId(1L);
        testItem.setName("나무 검");
        testItem.setType("weapon");
        testItem.setPrice(100);
        testItem.setAtkBonus(5);
        testItem.setHpBonus(0);
    }

    @Test
    void getAllItems_전체아이템조회_성공() {
        // given
        List<Item> items = Arrays.asList(testItem);
        when(itemRepository.findAll()).thenReturn(items);

        // when
        List<Item> result = shopService.getAllItems();

        // then
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(itemRepository, times(1)).findAll();
    }

    @Test
    void purchaseItem_정상구매_성공() {
        // given
        when(playerRepository.findByNickname(anyString()))
                .thenReturn(Optional.of(testPlayer));
        when(itemRepository.findById(anyLong()))
                .thenReturn(Optional.of(testItem));
        when(playerItemRepository.save(any(PlayerItem.class)))
                .thenReturn(new PlayerItem());

        // when
        PlayerItem result = shopService.purchaseItem("TestPlayer", 1L);

        // then
        assertNotNull(result);
        assertEquals(400, testPlayer.getGold()); // 골드 차감 확인
        assertEquals(15, testPlayer.getAtk()); // 공격력 증가 확인
        verify(playerRepository, times(1)).save(testPlayer);
        verify(playerItemRepository, times(1)).save(any(PlayerItem.class));
    }

    @Test
    void purchaseItem_골드부족_예외발생() {
        // given
        testPlayer.setGold(50); // 아이템 가격보다 적은 골드
        when(playerRepository.findByNickname(anyString()))
                .thenReturn(Optional.of(testPlayer));
        when(itemRepository.findById(anyLong()))
                .thenReturn(Optional.of(testItem));

        // when & then
        assertThrows(InsufficientGoldException.class, () -> {
            shopService.purchaseItem("TestPlayer", 1L);
        });
        verify(playerRepository, never()).save(any(Player.class));
        verify(playerItemRepository, never()).save(any(PlayerItem.class));
    }

    @Test
    void purchaseItem_플레이어없음_예외발생() {
        // given
        when(playerRepository.findByNickname(anyString()))
                .thenReturn(Optional.empty());

        // when & then
        assertThrows(PlayerNotFoundException.class, () -> {
            shopService.purchaseItem("NonExistentPlayer", 1L);
        });
    }

    @Test
    void purchaseItem_아이템없음_예외발생() {
        // given
        when(playerRepository.findByNickname(anyString()))
                .thenReturn(Optional.of(testPlayer));
        when(itemRepository.findById(anyLong()))
                .thenReturn(Optional.empty());

        // when & then
        assertThrows(ItemNotFoundException.class, () -> {
            shopService.purchaseItem("TestPlayer", 999L);
        });
    }
}
