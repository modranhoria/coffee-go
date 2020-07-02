package com.arvato.coffeeservice.models;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "addresses")
@Entity
public class Address {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "house_nr")
    private Integer houseNr;

    @Column
    private String street;

    @Column
    private String city;

}
