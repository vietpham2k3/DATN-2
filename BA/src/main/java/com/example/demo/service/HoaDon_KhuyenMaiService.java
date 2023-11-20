package com.example.demo.service;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDon_KhuyenMai;

import java.util.List;
import java.util.UUID;

public interface HoaDon_KhuyenMaiService {

    List<HoaDon_KhuyenMai> getAllNotById();

    List<HoaDon_KhuyenMai> getAll(UUID id);

    List<HoaDon_KhuyenMai> existsById(String khuyenMai, HoaDon hoaDon);

    HoaDon_KhuyenMai add(HoaDon_KhuyenMai khuyenMai);


}
