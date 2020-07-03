package com.arvato.coffeeservice.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_items")
@Entity
public class OrderItems {

    @Id
    @GeneratedValue
    private Long id;

    @JsonBackReference
    @ManyToOne
    @MapsId("orderId")
    private Order order;
    @JsonBackReference
    @ManyToOne
    @MapsId("productId")
    private Product product;

    @Column(name = "quantity")
    private Long quantity;

}
