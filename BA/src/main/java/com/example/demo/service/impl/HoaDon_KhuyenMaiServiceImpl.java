package com.example.demo.service.impl;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDon_KhuyenMai;
import com.example.demo.repository.HoaDon_KhuyenMaiRepository;
import com.example.demo.service.HoaDon_KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HoaDon_KhuyenMaiServiceImpl implements HoaDon_KhuyenMaiService {

    @Autowired
    private HoaDon_KhuyenMaiRepository repository;

    @Override
    public List<HoaDon_KhuyenMai> getAllNotById() {
        return repository.findAll();
    }

    @Override
    public List<HoaDon_KhuyenMai> getAll(UUID id) {
        return repository.getAll(id);
    }

    @Override
    public List<HoaDon_KhuyenMai> existsById(String khuyenMai, HoaDon hoaDon) {
        return repository.existsById(khuyenMai, hoaDon);
    }

    @Override
    public HoaDon_KhuyenMai add(HoaDon_KhuyenMai khuyenMai) {
        return repository.save(khuyenMai);
    }
}
