package com.arvato.coffeeservice.models;

import com.arvato.coffeeservice.utils.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToOne
    @JoinColumn(name = "processed_by", referencedColumnName = "id")
    private User processedBy;

    @Column(name = "processed_time")
    private LocalDateTime processedTime;

    @Column
    private OrderStatus status;

    @OneToMany
    @JoinTable(name = "order_product")
    private List<Product> products;

}
