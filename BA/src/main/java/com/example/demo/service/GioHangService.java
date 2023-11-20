package com.example.demo.service;


import com.example.demo.entity.GioHang;

import java.util.UUID;

public interface GioHangService {
    GioHang getAll(UUID id);

    GioHang add(GioHang gioHang);



}
