package com.typingrpg.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 20)
    private String type;

    @Column(nullable = false)
    private Integer price;

    @Column
    private Integer atkBonus = 0;

    @Column
    private Integer hpBonus = 0;

    @Column(length = 500)
    private String description;

    @Column(length = 10)
    private String icon;
}
