package com.typingrpg.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "game_scores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id", nullable = false)
    private Player player;

    @Column(nullable = false)
    private Integer contentId;

    @Column(nullable = false)
    private Integer score;

    @Column(nullable = false)
    private Double wpm;

    @Column(nullable = false)
    private Double accuracy;

    @Column(nullable = false)
    private Integer monstersDefeated;

    @Column(nullable = false)
    private Boolean isWin;

    @Column(nullable = false, updatable = false)
    private LocalDateTime playedAt = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        if (playedAt == null) {
            playedAt = LocalDateTime.now();
        }
    }
}
