package com.example.demo.service.impl;

import com.example.demo.entity.LoaiSanPham;
import com.example.demo.repository.LoaiSanPhamRepository;
import com.example.demo.service.LoaiSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class LoaiSanPhamServiceImpl implements LoaiSanPhamService {

    @Autowired
    private LoaiSanPhamRepository repository;

    @Override
    public List<LoaiSanPham> getAll() {
        return repository.getAll();
    }

    @Override
    public Page<LoaiSanPham> getAllPages(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return repository.findAll(pageable);
    }

    @Override
    public LoaiSanPham add(LoaiSanPham loaiSanPham) {
        return repository.save(loaiSanPham);
    }

    @Override
    public LoaiSanPham delete(UUID id) {
        LoaiSanPham loaiSanPham = repository.findById(id).orElse(null);
        loaiSanPham.setTrangThai(1);
        loaiSanPham.setTen(loaiSanPham.getTen());
        loaiSanPham.setNgayTao(loaiSanPham.getNgayTao());
        loaiSanPham.setNgaySua(new Date());
        return repository.save(loaiSanPham);
    }

    @Override
    public LoaiSanPham detail(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Page<LoaiSanPham> searchPage(String key, Integer trangThai, Pageable pageable) {
        return repository.searchPage(key, trangThai, pageable);
    }

    @Override
    public List<LoaiSanPham> findByLoaiSanPhamString(List<String> lsphamString) {
        List<LoaiSanPham> loaiSanPhams = new ArrayList<>();
        for (String lsp: lsphamString) {
            LoaiSanPham loaiSanPham = repository.findByTen(lsp);
            loaiSanPhams.add(loaiSanPham);
        }
        return loaiSanPhams;
    }
}
