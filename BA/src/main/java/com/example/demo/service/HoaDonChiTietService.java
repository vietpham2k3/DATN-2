package com.example.demo.service;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;

import java.util.List;
import java.util.UUID;

public interface HoaDonChiTietService {

    List<HoaDonChiTiet> getAll(UUID id);

    List<HoaDonChiTiet> getAllByIdHD(UUID id);

    List<HoaDonChiTiet> findAll();

    HoaDonChiTiet add(HoaDonChiTiet hoaDonChiTiet);

    void taoHoaDon(List<HoaDonChiTiet> hoaDonChiTiet);

    void delete(UUID id);

    void deleteByIdHD(UUID id);

    void update(Integer soLuong, UUID id);

    void updateSL(Integer soLuong, UUID id);

    List<HoaDonChiTiet> existsById(ChiTietSanPham chiTietSanPham, HoaDon hoaDon);

    HoaDonChiTiet findById(UUID id);

    void updateSLDH(Integer soLuong, UUID id);

    void updateSLHL(Integer soLuong, UUID id);

    void updateHL(String nguoiTao,String ghiChu,UUID id);
}
