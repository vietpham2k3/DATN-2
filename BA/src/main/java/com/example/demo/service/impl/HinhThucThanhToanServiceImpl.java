package com.example.demo.service.impl;

import com.example.demo.entity.HinhThucThanhToan;
import com.example.demo.repository.HinhThucThanhToanRespository;
import com.example.demo.service.HinhThucThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HinhThucThanhToanServiceImpl implements HinhThucThanhToanService {
    @Autowired public HinhThucThanhToanRespository res;

    @Override
    public List<HinhThucThanhToan> getAll() {
        return res.findAll();
    }

    @Override
    public HinhThucThanhToan add(HinhThucThanhToan hinhThucThanhToan) {
        return res.save(hinhThucThanhToan);
    }

    @Override
    public HinhThucThanhToan detail(UUID id) {
        return res.findById(id).orElse(null);
    }
}
