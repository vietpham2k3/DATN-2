package com.example.demo.service;

import org.springframework.stereotype.Service;

@Service
public interface SendEmailService {
    void sendEmail(String to, String subject, String body);
}
