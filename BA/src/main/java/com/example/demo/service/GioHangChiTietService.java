package com.example.demo.service;

import com.example.demo.entity.GioHangChiTiet;

import java.util.List;
import java.util.UUID;

public interface GioHangChiTietService {

    Integer countSPOnGH(UUID id);

    GioHangChiTiet add(GioHangChiTiet gioHangChiTiet);

    List<GioHangChiTiet> getAll(UUID id);

    GioHangChiTiet findById(UUID id);

    void updateSL(Integer soLuong, UUID id);

    void deleteAll(UUID id);

    void delete(UUID id);
}
