package com.typingrpg.backend.repository;

import com.typingrpg.backend.entity.PlayerItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerItemRepository extends JpaRepository<PlayerItem, Long> {

    List<PlayerItem> findByPlayerId(Long playerId);

    Long countByPlayerId(Long playerId);
}
