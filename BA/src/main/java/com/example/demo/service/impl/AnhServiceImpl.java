package com.example.demo.service.impl;

import com.example.demo.entity.Anh;
import com.example.demo.repository.AnhRepository;
import com.example.demo.service.AnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AnhServiceImpl implements AnhService {

    @Autowired
    private AnhRepository repository;


    @Override
    public Anh viewById(UUID id) {
        return repository.findFirstByChiTietSanPhamId(id);
    }

    @Override
    public Anh add(Anh anh) {
        return repository.save(anh);
    }

    @Override
    public List<Anh> getAllByChiTietSanPhamId(UUID id) {
        return repository.findAllByChiTietSanPhamId(id);
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }
}
