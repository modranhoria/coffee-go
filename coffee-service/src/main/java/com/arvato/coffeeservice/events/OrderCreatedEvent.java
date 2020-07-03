package com.arvato.coffeeservice.events;

import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.context.ApplicationEvent;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

public class OrderCreatedEvent extends ApplicationEvent {

    private final String message;

    /**
     * Create a new {@code ApplicationEvent}.
     *
     * @param source the object on which the event initially occurred or with
     *               which the event is associated (never {@code null})
     */
    public OrderCreatedEvent(final Object source, String message) throws MessagingException {
        super(source);
        this.message = message;

        sendEmail(message);
    }

    public void sendEmail(String messageBody) throws MessagingException {
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
        javaMailSender.setHost("mail");
        javaMailSender.setPort(1025);

        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", "smtp");

        javaMailSender.setJavaMailProperties(properties);

        MimeMessage message = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, true);

        mimeMessageHelper.setTo("recipient@test.com");
        mimeMessageHelper.setFrom("sender@test.com");
        mimeMessageHelper.setSubject("Order created");
        mimeMessageHelper.setText(messageBody);

        javaMailSender.send(message);
    }
}
