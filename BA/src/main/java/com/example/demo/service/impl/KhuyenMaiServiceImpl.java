package com.example.demo.service.impl;

import com.example.demo.entity.KhuyenMai;
import com.example.demo.repository.KhuyenMaiRepository;
import com.example.demo.service.KhuyenMaiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class KhuyenMaiServiceImpl implements KhuyenMaiService {

    @Autowired
    private KhuyenMaiRepository khuyenMaiRepository;

    @Override
    public List<KhuyenMai> getAll() {
        return khuyenMaiRepository.findAll();
    }

    @Override
    public List<KhuyenMai> getAllKM(Double tien) {
        return khuyenMaiRepository.getAll(tien);
    }

    @Override
    public Page<KhuyenMai> pageKM(Pageable pageable) {
        return khuyenMaiRepository.findAll(pageable);
    }


    @Override
    public Page<KhuyenMai> pageSearchKM(String key, Integer trangThai, Pageable pageable) {
        return khuyenMaiRepository.search(key, trangThai, pageable);
    }

    @Override
    public KhuyenMai add(KhuyenMai khuyenMai) {
        return khuyenMaiRepository.save(khuyenMai);
    }

    @Override
    public KhuyenMai detail(UUID id) {
        return khuyenMaiRepository.findById(id).orElse(null);
    }

    @Override
    public KhuyenMai xoa(UUID id) {
        KhuyenMai km = khuyenMaiRepository.findById(id).orElse(null);
        km.setTrangThai(1);
        return khuyenMaiRepository.save(km);
    }
}
