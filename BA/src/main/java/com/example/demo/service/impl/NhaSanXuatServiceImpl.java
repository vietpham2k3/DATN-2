package com.example.demo.service.impl;

import com.example.demo.entity.NhaSanXuat;
import com.example.demo.repository.NhaSanXuatRepository;
import com.example.demo.service.NhaSanXuatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class NhaSanXuatServiceImpl implements NhaSanXuatService {

    @Autowired
    private NhaSanXuatRepository repository;

    @Override
    public List<NhaSanXuat> getAllNSX() {
        return repository.getAll();
    }

    @Override
    public Page<NhaSanXuat> pageNSX(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Page<NhaSanXuat> pageSearchNSX(String key, Integer trangThai,  Pageable pageable) {
        return repository.searchPageNSX(key,trangThai ,pageable);
    }

    @Override
    public NhaSanXuat add(NhaSanXuat nhaSanXuat) {
        nhaSanXuat.setTen(nhaSanXuat.getTen());
        return repository.save(nhaSanXuat);
    }

    @Override
    public NhaSanXuat detail(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public NhaSanXuat xoa(UUID id) {
        NhaSanXuat nhaSanXuat = repository.findById(id).orElse(null);
        nhaSanXuat.setTen(nhaSanXuat.getTen());
        nhaSanXuat.setNgayTao(nhaSanXuat.getNgayTao());
        nhaSanXuat.setNgaySua(new Date());
        nhaSanXuat.setTrangThai(1);
        return repository.save(nhaSanXuat);
    }

    @Override
    public List<NhaSanXuat> findByNhaSanXuatString(List<String> nsxString) {
        List<NhaSanXuat> nhaSanXuats = new ArrayList<>();
        for (String nsx: nsxString) {
            NhaSanXuat nhaSanXuat = repository.findByTen(nsx);
            nhaSanXuats.add(nhaSanXuat);
        }
        return nhaSanXuats;
    }
}
