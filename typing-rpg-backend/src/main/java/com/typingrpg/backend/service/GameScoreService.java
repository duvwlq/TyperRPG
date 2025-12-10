package com.typingrpg.backend.service;

import com.typingrpg.backend.dto.GameScoreDto;
import com.typingrpg.backend.entity.GameScore;
import com.typingrpg.backend.entity.Player;
import com.typingrpg.backend.repository.GameScoreRepository;
import com.typingrpg.backend.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameScoreService {

    private final GameScoreRepository gameScoreRepository;
    private final PlayerService playerService;
    private final PlayerRepository playerRepository;

    /**
     * 게임 점수를 저장하고 플레이어 통계를 업데이트합니다.
     *
     * @param nickname 플레이어 닉네임
     * @param dto 게임 점수 데이터
     * @return 저장된 게임 점수
     */
    @Transactional
    public GameScore saveScore(String nickname, GameScoreDto dto) {
        Player player = playerService.getOrCreatePlayer(nickname);

        GameScore score = new GameScore();
        score.setPlayer(player);
        score.setContentId(dto.getContentId());
        score.setScore(dto.getScore());
        score.setWpm(dto.getWpm());
        score.setAccuracy(dto.getAccuracy());
        score.setMonstersDefeated(dto.getMonstersDefeated());
        score.setIsWin(dto.getIsWin());

        GameScore saved = gameScoreRepository.save(score);

        // 플레이어 통계 업데이트
        player.setGamesPlayed(player.getGamesPlayed() + 1);
        if (dto.getIsWin()) {
            player.setGamesWon(player.getGamesWon() + 1);
        }
        player.setTotalScore(player.getTotalScore() + dto.getScore());
        playerRepository.save(player);

        return saved;
    }

    /**
     * 상위 10개의 게임 점수를 조회합니다.
     *
     * @return 상위 10개 게임 점수 DTO 리스트
     */
    @Transactional(readOnly = true)
    public List<GameScoreDto> getTop10Rankings() {
        return gameScoreRepository.findTop10ByOrderByScoreDesc()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 특정 플레이어의 게임 기록을 최신순으로 조회합니다.
     *
     * @param nickname 플레이어 닉네임
     * @return 플레이어의 게임 점수 DTO 리스트
     */
    @Transactional(readOnly = true)
    public List<GameScoreDto> getPlayerScores(String nickname) {
        Player player = playerService.getOrCreatePlayer(nickname);
        return gameScoreRepository.findByPlayerOrderByPlayedAtDesc(player)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * GameScore 엔티티를 GameScoreDto로 변환합니다.
     *
     * @param score GameScore 엔티티
     * @return GameScoreDto
     */
    private GameScoreDto convertToDto(GameScore score) {
        GameScoreDto dto = new GameScoreDto();
        dto.setId(score.getId());
        dto.setNickname(score.getPlayer().getNickname());
        dto.setLevel(score.getPlayer().getLevel());
        dto.setContentId(score.getContentId());
        dto.setScore(score.getScore());
        dto.setWpm(score.getWpm());
        dto.setAccuracy(score.getAccuracy());
        dto.setMonstersDefeated(score.getMonstersDefeated());
        dto.setIsWin(score.getIsWin());
        dto.setPlayedAt(score.getPlayedAt());
        return dto;
    }
}
