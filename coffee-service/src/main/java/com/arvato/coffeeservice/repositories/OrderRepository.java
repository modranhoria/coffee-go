package com.arvato.coffeeservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arvato.coffeeservice.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {}
