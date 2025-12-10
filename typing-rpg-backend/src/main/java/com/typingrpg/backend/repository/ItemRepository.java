package com.typingrpg.backend.repository;

import com.typingrpg.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByType(String type);

    List<Item> findByPriceLessThanEqual(Integer price);
}
