package com.arvato.coffeeservice.models;

import javax.persistence.*;

import com.arvato.coffeeservice.utils.EmployeeType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
@Entity
public class Employee {
    @Id
    @GeneratedValue
    private Long id;

    @Column
    private EmployeeType type;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
