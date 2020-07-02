package com.arvato.coffeeservice.repositories;

import com.arvato.coffeeservice.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
