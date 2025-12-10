package com.typingrpg.backend.repository;

import com.typingrpg.backend.entity.GameScore;
import com.typingrpg.backend.entity.Item;
import com.typingrpg.backend.entity.Player;
import com.typingrpg.backend.entity.PlayerItem;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class RepositoryTests {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private GameScoreRepository gameScoreRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private PlayerItemRepository playerItemRepository;

    @Test
    @DisplayName("플레이어 생성 및 조회 테스트")
    void testCreateAndFindPlayer() {
        // Given
        Player player = new Player();
        player.setNickname("TestPlayer");
        player.setLevel(1);
        player.setExp(0);
        player.setGold(100);
        player.setHp(100);
        player.setMaxHp(100);
        player.setAtk(10);

        // When
        Player savedPlayer = playerRepository.save(player);

        // Then
        assertNotNull(savedPlayer.getId());
        assertEquals("TestPlayer", savedPlayer.getNickname());
        assertEquals(1, savedPlayer.getLevel());

        // 닉네임으로 조회
        Optional<Player> foundPlayer = playerRepository.findByNickname("TestPlayer");
        assertTrue(foundPlayer.isPresent());
        assertEquals("TestPlayer", foundPlayer.get().getNickname());
    }

    @Test
    @DisplayName("닉네임 중복 확인 테스트")
    void testExistsByNickname() {
        // Given
        Player player = new Player();
        player.setNickname("UniquePlayer");
        playerRepository.save(player);

        // When & Then
        assertTrue(playerRepository.existsByNickname("UniquePlayer"));
        assertFalse(playerRepository.existsByNickname("NonExistentPlayer"));
    }

    @Test
    @DisplayName("게임 점수 저장 및 조회 테스트")
    void testCreateGameScore() {
        // Given
        Player player = new Player();
        player.setNickname("ScorePlayer");
        Player savedPlayer = playerRepository.save(player);

        GameScore score = new GameScore();
        score.setPlayer(savedPlayer);
        score.setContentId(1);
        score.setScore(1000);
        score.setWpm(80.5);
        score.setAccuracy(95.5);
        score.setMonstersDefeated(5);
        score.setIsWin(true);
        score.setPlayedAt(LocalDateTime.now());

        // When
        GameScore savedScore = gameScoreRepository.save(score);

        // Then
        assertNotNull(savedScore.getId());
        assertEquals(1000, savedScore.getScore());
        assertEquals(80.5, savedScore.getWpm());
    }

    @Test
    @DisplayName("Top 10 점수 조회 테스트")
    void testFindTop10Scores() {
        // Given
        Player player = new Player();
        player.setNickname("RankingPlayer");
        Player savedPlayer = playerRepository.save(player);

        for (int i = 1; i <= 15; i++) {
            GameScore score = new GameScore();
            score.setPlayer(savedPlayer);
            score.setContentId(1);
            score.setScore(i * 100);
            score.setWpm(50.0 + i);
            score.setAccuracy(90.0);
            score.setMonstersDefeated(i);
            score.setIsWin(true);
            gameScoreRepository.save(score);
        }

        // When
        List<GameScore> top10 = gameScoreRepository.findTop10ByOrderByScoreDesc();

        // Then
        assertEquals(10, top10.size());
        assertEquals(1500, top10.get(0).getScore()); // 최고점
    }

    @Test
    @DisplayName("아이템 조회 테스트")
    void testFindItems() {
        // Given - 테스트 데이터만 사용
        itemRepository.deleteAll(); // 기존 데이터 삭제

        Item weapon1 = new Item();
        weapon1.setName("테스트 검");
        weapon1.setType("weapon");
        weapon1.setPrice(100);
        weapon1.setAtkBonus(10);
        weapon1.setHpBonus(0);
        itemRepository.save(weapon1);

        Item weapon2 = new Item();
        weapon2.setName("강력한 검");
        weapon2.setType("weapon");
        weapon2.setPrice(200);
        weapon2.setAtkBonus(20);
        weapon2.setHpBonus(0);
        itemRepository.save(weapon2);

        Item armor = new Item();
        armor.setName("테스트 갑옷");
        armor.setType("armor");
        armor.setPrice(150);
        armor.setAtkBonus(0);
        armor.setHpBonus(20);
        itemRepository.save(armor);

        // When
        List<Item> weapons = itemRepository.findByType("weapon");
        List<Item> armors = itemRepository.findByType("armor");
        List<Item> affordableItems = itemRepository.findByPriceLessThanEqual(120);

        // Then
        assertEquals(2, weapons.size());
        assertEquals(1, armors.size());
        assertTrue(affordableItems.size() >= 1); // 100원짜리 검
    }

    @Test
    @DisplayName("플레이어 아이템 구매 테스트")
    void testPlayerItemPurchase() {
        // Given
        Player player = new Player();
        player.setNickname("Buyer");
        player.setGold(500);
        Player savedPlayer = playerRepository.save(player);

        Item item = new Item();
        item.setName("구매 테스트 아이템");
        item.setType("weapon");
        item.setPrice(100);
        Item savedItem = itemRepository.save(item);

        PlayerItem playerItem = new PlayerItem();
        playerItem.setPlayer(savedPlayer);
        playerItem.setItem(savedItem);
        playerItem.setPurchasedAt(LocalDateTime.now());

        // When
        PlayerItem savedPlayerItem = playerItemRepository.save(playerItem);

        // Then
        assertNotNull(savedPlayerItem.getId());
        assertEquals("Buyer", savedPlayerItem.getPlayer().getNickname());
        assertEquals("구매 테스트 아이템", savedPlayerItem.getItem().getName());

        // 플레이어 인벤토리 조회
        List<PlayerItem> inventory = playerItemRepository.findByPlayerId(savedPlayer.getId());
        assertEquals(1, inventory.size());

        Long itemCount = playerItemRepository.countByPlayerId(savedPlayer.getId());
        assertEquals(1, itemCount);
    }

    @Test
    @DisplayName("플레이어 게임 기록 조회 테스트")
    void testPlayerGameHistory() {
        // Given
        Player player = new Player();
        player.setNickname("HistoryPlayer");
        Player savedPlayer = playerRepository.save(player);

        // 3개의 게임 기록 생성
        for (int i = 1; i <= 3; i++) {
            GameScore score = new GameScore();
            score.setPlayer(savedPlayer);
            score.setContentId(i);
            score.setScore(i * 200);
            score.setWpm(60.0 + i);
            score.setAccuracy(92.0);
            score.setMonstersDefeated(i);
            score.setIsWin(i % 2 == 0);
            gameScoreRepository.save(score);
        }

        // When
        List<GameScore> history = gameScoreRepository.findByPlayerOrderByPlayedAtDesc(savedPlayer);
        List<GameScore> topScores = gameScoreRepository.findByPlayerIdOrderByScoreDesc(savedPlayer.getId());

        // Then
        assertEquals(3, history.size());
        assertEquals(3, topScores.size());
        assertEquals(600, topScores.get(0).getScore()); // 최고점이 먼저
    }
}
