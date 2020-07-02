package com.arvato.coffeeservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.arvato.coffeeservice.models.Product;

@Component
public interface ProductRepository extends JpaRepository<Product, Long> {

}
