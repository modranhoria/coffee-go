package com.arvato.coffeeservice.repositories;

import com.arvato.coffeeservice.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long> {

}
