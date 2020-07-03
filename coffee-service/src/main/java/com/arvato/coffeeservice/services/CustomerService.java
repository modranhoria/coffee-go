package com.arvato.coffeeservice.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.arvato.coffeeservice.models.Address;
import com.arvato.coffeeservice.models.Customer;
import com.arvato.coffeeservice.repositories.AddressRepository;
import com.arvato.coffeeservice.repositories.CustomerRepository;

@Service
@Transactional
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AddressRepository addressRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer createCustomer(Customer customer) {
        Customer created = customerRepository.saveAndFlush(customer);
        List<Address> addresses = created.getAddresses();
        addresses.forEach(x -> addressRepository.saveAndFlush(x));
        return created;
    }

}
