package com.arvato.coffeeservice.events;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
public class OrderEventPublisher {
    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    public void publishEvent(final String message) throws MessagingException {
        System.out.println("Publishing order event. ");
        OrderCreatedEvent event = new OrderCreatedEvent(this, message);
        applicationEventPublisher.publishEvent(event);
    }
}