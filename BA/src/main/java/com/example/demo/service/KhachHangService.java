package com.example.demo.service;

import com.example.demo.entity.KhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

public interface KhachHangService {

    List<KhachHang> getAll();

    List<KhachHang> getAllKH();

    List<KhachHang> searchKHinBH(String key);

    Page<KhachHang> getAll(Integer page);

    KhachHang add(KhachHang khachHang);

    KhachHang delete(UUID id);

    KhachHang getOne(UUID id);

    KhachHang findKhachHangByEmailAndMatKhau(String email, String matKhau);

    KhachHang update(KhachHang khachHang, UUID id);

    Blob createBlob(InputStream inputStream) throws SQLException, IOException;

    Page<KhachHang> searchKH(String key, Integer trangThai, Boolean gioiTinh, Pageable pageable);

    void sendResetPasswordEmail(String email, String tenKhachHang);

    KhachHang dangKy(KhachHang khachHang);

    boolean checkEmailExists(String email);


    KhachHang updateKhinfo(KhachHang khachHang, UUID id);

    KhachHang changePassword(KhachHang khachHang);
    boolean isCurrentPasswordValid(UUID id, String currentPassword);

}
