package com.example.demo.service.impl;

import com.example.demo.entity.SanPham;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class SanPhamServiceImpl implements SanPhamService {

    @Autowired
    private SanPhamRepository repository;

    @Override
    public SanPham add(SanPham sanPham) {
        return repository.save(sanPham);
    }

    @Override
    public SanPham detail(UUID id) {
        return repository.findById(id).orElse(null);
    }
}
