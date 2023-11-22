package com.example.demo.service;

import com.example.demo.entity.NhanVien;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

public interface NhanVienService {

    List<NhanVien> fillAll();

    Page<NhanVien> getAll(Integer page);

    Page<NhanVien> searchNhanVienPage(String key,Integer trangThai,Pageable pageable);

    NhanVien getOne(UUID id);

    NhanVien add(NhanVien nhanVien);

    NhanVien update(NhanVien nhanVien, UUID id);

    void delete(UUID id);

    NhanVien findKhachHangByEmailAndMatKhau(String email, String matKhau);

}
