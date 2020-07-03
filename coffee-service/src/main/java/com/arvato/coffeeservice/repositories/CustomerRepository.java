package com.arvato.coffeeservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arvato.coffeeservice.models.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {}
