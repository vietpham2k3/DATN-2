package com.example.demo.service.impl;

import com.example.demo.entity.KhachHang;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.sql.rowset.serial.SerialBlob;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class KhachHangServiceImpl implements KhachHangService {

    @Autowired
    private KhachHangRepository khRepo;
    @Autowired
    private SendEmailServicecImpl emailService;

    @Override
    public List<KhachHang> getAll() {
        return khRepo.findAll();
    }

    @Override
    public List<KhachHang> getAllKH() {
        return khRepo.getAllKH();
    }

    @Override
    public List<KhachHang> searchKHinBH(String key) {
        return khRepo.searchKHinBH(key);
    }

    @Override
    public Page<KhachHang> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return khRepo.findAll(pageable);
    }

    @Override
    public KhachHang add(KhachHang khachHang) {
        return khRepo.save(khachHang);
    }

    @Override
    public KhachHang delete(UUID id) {
        KhachHang khachHang = khRepo.findById(id).orElse(null);
        khachHang.setTrangThai(0);
        khachHang.setMaKhachHang(khachHang.getMaKhachHang());
        khachHang.setTenKhachHang(khachHang.getTenKhachHang());
        khachHang.setSdt(khachHang.getSdt());
        khachHang.setEmail(khachHang.getEmail());
        khachHang.setNgaySinh(khachHang.getNgaySinh());
        khachHang.setMatKhau(khachHang.getMatKhau());
        return khRepo.save(khachHang);
    }

    @Override
    public KhachHang getOne(UUID id) {
        return khRepo.findById(id).orElse(null);
    }

    @Override
    public KhachHang findKhachHangByEmailAndMatKhau(String email, String matKhau) {
        return khRepo.findKhachHangByEmailAndMatKhau(email, matKhau);
    }

    //
    @Override
    public KhachHang update(KhachHang khachHang, UUID id) {
        Optional<KhachHang> op = khRepo.findById(id);
        return op.map(o -> {
            o.setMaKhachHang(khachHang.getMaKhachHang());
            o.setTenKhachHang(khachHang.getTenKhachHang());
            o.setSdt(khachHang.getSdt());
            o.setEmail(khachHang.getEmail());
            o.setNgaySinh(khachHang.getNgaySinh());
            o.setMatKhau(khachHang.getMatKhau());
            o.setTrangThai(khachHang.getTrangThai());
            return khRepo.save(o);
        }).orElse(null);
    }

    @Override
    public Blob createBlob(InputStream inputStream) throws SQLException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        byte[] bytes = outputStream.toByteArray();
        return new SerialBlob(bytes);
    }

    @Override
    public Page<KhachHang> searchKH(String key, Integer trangThai, Boolean gioiTinh, Pageable pageable) {
        return khRepo.searchKH(key, trangThai, gioiTinh, pageable);
    }

    @Override
    public void sendResetPasswordEmail(String email, String tenKhachHang) {
        String newPassword = generateRandomPassword();
        khRepo.updatePasswordByEmail(newPassword, email);
        emailService.sendEmail(email, "Cấp Lại Mật khẩu mới", "Thông tin tài khoản của bạn:\n" +
                "Xin chào, " + tenKhachHang + "\n" +
                "Tên đăng nhập: " + email + "\n" +
                "Mật khẩu cấp mới của bạn: " + newPassword + "\n" +
                "Lưu ý: Đây là mật khẩu mặc định được tạo bởi hệ thống, bạn vui lòng đổi lại để đảm bảo an toàn thông tin."
        );
    }

    @Override
    public KhachHang dangKy(KhachHang khachHang) {
        khRepo.save(khachHang);
        return khachHang;
    }

    @Override
    public boolean checkEmailExists(String email) {
        KhachHang khachHang = khRepo.findByEmail(email);
        return khachHang != null;
    }

    private String generateRandomPassword() {
        return UUID.randomUUID().toString().substring(0, 8);
    }



    @Override
    public KhachHang updateKhinfo(KhachHang khachHang, UUID id) {
        Optional<KhachHang> op = khRepo.findById(id);
        return op.map(o -> {
            o.setTenKhachHang(khachHang.getTenKhachHang());
            o.setEmail(khachHang.getEmail());
            o.setNgaySinh(khachHang.getNgaySinh());
            o.setGioiTinh(khachHang.getGioiTinh());
            return khRepo.save(o);
        }).orElse(null);
    }

    @Override
    public KhachHang changePassword(KhachHang khachHang) {
        return khRepo.save(khachHang);

    }

    @Override
    public boolean isCurrentPasswordValid(UUID id, String currentPassword) {
        KhachHang user = khRepo.findById(id).orElse(null);

        if (user == null) {
            return false;
        }

        boolean isPasswordValid = currentPassword.equals(user.getMatKhau());

        return isPasswordValid;
    }




}
