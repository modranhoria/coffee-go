package com.arvato.coffeeservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arvato.coffeeservice.models.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {}
