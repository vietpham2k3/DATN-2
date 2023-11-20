package com.example.demo.service;

import com.example.demo.entity.LoaiSanPham;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface LoaiSanPhamService {

    List<LoaiSanPham> getAll();

    Page<LoaiSanPham> getAllPages(Integer page);

    LoaiSanPham add(LoaiSanPham loaiSanPham);

    LoaiSanPham delete(UUID id);

    LoaiSanPham detail(UUID id);

    Page<LoaiSanPham> searchPage(String key, Integer trangThai, Pageable pageable);

    List<LoaiSanPham> findByLoaiSanPhamString (List<String> lsphamString) ;
}
