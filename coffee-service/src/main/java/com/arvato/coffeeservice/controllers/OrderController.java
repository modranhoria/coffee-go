package com.arvato.coffeeservice.controllers;

import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.arvato.coffeeservice.events.OrderEventPublisher;
import com.arvato.coffeeservice.models.Order;
import com.arvato.coffeeservice.repositories.OrderRepository;

@RestController
@RequestMapping("orders")
public class OrderController {

    @Autowired
    private OrderEventPublisher publisher;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/all")
    public List<Order> getAllProducts() {
        return orderRepository.findAll();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) throws MessagingException {
        Order created = orderRepository.saveAndFlush(order);
        publisher.publishEvent("Created order " + created.toString());
        return created;
    }

    @PutMapping("/{id}")
    public Order editOrder(@RequestBody Order order, @PathVariable("id") Long id) {
        Optional<Order> oldOrder = orderRepository.findById(id);
        if (oldOrder.isPresent()) {
            oldOrder.get().setProcessedBy(order.getProcessedBy());
            oldOrder.get().setProcessedTime(order.getProcessedTime());
            oldOrder.get().setStatus(order.getStatus());
            oldOrder.get().setUser(order.getUser());
            //oldOrder.get().setOrderItems(order.getOrderItems());
        }
        return orderRepository.saveAndFlush(oldOrder.get());
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable("id") Long id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
            orderRepository.delete(order.get());
        }
    }

}
