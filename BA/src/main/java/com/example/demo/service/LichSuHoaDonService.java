package com.example.demo.service;

import com.example.demo.entity.LichSuHoaDon;

import java.util.List;
import java.util.UUID;

public interface LichSuHoaDonService {
    LichSuHoaDon createLichSuDonHang(LichSuHoaDon lichSuHoaDon);

    List<LichSuHoaDon> getAll();

    LichSuHoaDon detail(UUID id);

    void delete(UUID id);

    List<LichSuHoaDon> findAllLSHDByIDsHD(UUID id);

    LichSuHoaDon findLSHDByIDsHD(UUID id);

    LichSuHoaDon add(LichSuHoaDon lichSuHoaDon);

    List<LichSuHoaDon> createLichSuDonHangAll(List<LichSuHoaDon> lichSuHoaDonList);
}
