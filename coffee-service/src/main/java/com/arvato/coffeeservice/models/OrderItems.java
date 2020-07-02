package com.arvato.coffeeservice.models;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_items")
public class OrderItems {

    @EmbeddedId
    private OrderItemsId id;

    @ManyToOne
    @MapsId("orderId")
    private Order order;

    @ManyToOne
    @MapsId("productId")
    private Product product;

    @Column(name = "quantity")
    private Long quantity;

}
