package com.typingrpg.backend.service;

import com.typingrpg.backend.entity.Player;
import com.typingrpg.backend.repository.PlayerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * PlayerService 테스트
 */
@ExtendWith(MockitoExtension.class)
class PlayerServiceTest {

    @Mock
    private PlayerRepository playerRepository;

    @InjectMocks
    private PlayerService playerService;

    private Player testPlayer;

    @BeforeEach
    void setUp() {
        testPlayer = new Player();
        testPlayer.setId(1L);
        testPlayer.setNickname("TestPlayer");
        testPlayer.setLevel(1);
        testPlayer.setExp(0);
        testPlayer.setGold(0);
        testPlayer.setHp(100);
        testPlayer.setMaxHp(100);
        testPlayer.setAtk(10);
    }

    @Test
    void getOrCreatePlayer_기존플레이어_조회성공() {
        // given
        when(playerRepository.findByNickname(anyString()))
                .thenReturn(Optional.of(testPlayer));

        // when
        Player result = playerService.getOrCreatePlayer("TestPlayer");

        // then
        assertNotNull(result);
        assertEquals("TestPlayer", result.getNickname());
        verify(playerRepository, times(1)).findByNickname("TestPlayer");
        verify(playerRepository, never()).save(any(Player.class));
    }

    @Test
    void getOrCreatePlayer_새플레이어_생성성공() {
        // given
        when(playerRepository.findByNickname(anyString()))
                .thenReturn(Optional.empty());
        when(playerRepository.save(any(Player.class)))
                .thenReturn(testPlayer);

        // when
        Player result = playerService.getOrCreatePlayer("NewPlayer");

        // then
        assertNotNull(result);
        verify(playerRepository, times(1)).findByNickname("NewPlayer");
        verify(playerRepository, times(1)).save(any(Player.class));
    }

    @Test
    void updatePlayerStats_경험치골드업데이트_성공() {
        // given
        when(playerRepository.findByNickname(anyString()))
                .thenReturn(Optional.of(testPlayer));
        when(playerRepository.save(any(Player.class)))
                .thenReturn(testPlayer);

        // when
        Player result = playerService.updatePlayerStats("TestPlayer", 50, 100);

        // then
        assertNotNull(result);
        assertEquals(50, result.getExp());
        assertEquals(100, result.getGold());
        verify(playerRepository, times(1)).save(any(Player.class));
    }

    @Test
    void updatePlayerStats_레벨업_성공() {
        // given
        testPlayer.setExp(50);
        when(playerRepository.findByNickname(anyString()))
                .thenReturn(Optional.of(testPlayer));
        when(playerRepository.save(any(Player.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // when - 레벨업에 필요한 경험치 추가 (100)
        Player result = playerService.updatePlayerStats("TestPlayer", 50, 0);

        // then
        assertEquals(2, result.getLevel()); // 레벨업
        assertEquals(0, result.getExp()); // 경험치 리셋
        assertEquals(110, result.getMaxHp()); // HP 증가
        assertEquals(12, result.getAtk()); // 공격력 증가
    }
}
