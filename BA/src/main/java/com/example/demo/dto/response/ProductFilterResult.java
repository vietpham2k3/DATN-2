package com.example.demo.dto.response;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface ProductFilterResult {
    @Value("#{target.id}")
    UUID getId();
    @Value("#{target.ma}")
    String getMa();
    @Value("#{target.ten}")
    String getTen();
}
