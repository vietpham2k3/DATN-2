package com.example.demo.service;

import com.example.demo.entity.SanPham;

import java.util.UUID;

public interface SanPhamService {

    SanPham add(SanPham sanPham);

    SanPham detail(UUID id);

}
