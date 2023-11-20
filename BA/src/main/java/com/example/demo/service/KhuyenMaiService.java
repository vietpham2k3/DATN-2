package com.example.demo.service;

import com.example.demo.entity.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface KhuyenMaiService {
    List<KhuyenMai> getAll();

    List<KhuyenMai> getAllKM(Double tien);

    Page<KhuyenMai> pageKM(Pageable pageable);

    Page<KhuyenMai> pageSearchKM(String key, Integer trangThai, Pageable pageable);

    KhuyenMai add(KhuyenMai khuyenMai);

    KhuyenMai detail(UUID id);

    KhuyenMai xoa(UUID id);

}
