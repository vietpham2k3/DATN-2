package com.example.demo.service.impl;

import com.example.demo.entity.GioHangChiTiet;
import com.example.demo.repository.GioHangChiTietRepsitory;
import com.example.demo.service.GioHangChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GioHangChiTietServiceImpl implements GioHangChiTietService {

    @Autowired
    private GioHangChiTietRepsitory repository;

    @Override
    public Integer countSPOnGH(UUID id) {
        return repository.countSPOnGH(id);
    }

    @Override
    public GioHangChiTiet add(GioHangChiTiet gioHangChiTiet) {
        return repository.save(gioHangChiTiet);
    }

    @Override
    public List<GioHangChiTiet> getAll(UUID id) {
        return repository.getAll(id);
    }

    @Override
    public GioHangChiTiet findById(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void updateSL(Integer soLuong, UUID id) {
        repository.updateSL(soLuong, id);
    }

    @Override
    public void deleteAll(UUID id) {
        repository.deleteAll(id);
    }

    @Override
    public void delete(UUID id) {
        repository.deleteById(id);
    }
}
