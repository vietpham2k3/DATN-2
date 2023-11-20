package com.example.demo.service;

import com.example.demo.entity.HinhThucThanhToan;

import java.util.List;
import java.util.UUID;

public interface HinhThucThanhToanService {
    public List<HinhThucThanhToan> getAll();

    HinhThucThanhToan add(HinhThucThanhToan hinhThucThanhToan);

    HinhThucThanhToan detail(UUID id);
}
