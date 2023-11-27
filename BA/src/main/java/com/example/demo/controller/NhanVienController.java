package com.example.demo.controller;

import com.example.demo.UploadFile.AnhNV;
import com.example.demo.dto.NhanVienRequest;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.NhanVien;
import com.example.demo.service.NhanVienService;
import com.example.demo.service.impl.SendEmailServicecImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/api/nhanvien")
@CrossOrigin(origins = "http://localhost:3000")

public class NhanVienController {

    @Autowired
    private NhanVienService service;

    @Autowired
    private SendEmailServicecImpl emailService;

    @GetMapping("/getAll/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") UUID id) throws IOException, SQLException {
        NhanVien nv = service.getOne(id);
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getAllPage")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") Integer page) throws IOException {
        Page<NhanVien> nhanVienPage = service.getAll(page);
        return ResponseEntity.ok()
                .body(nhanVienPage);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        NhanVien nhanVien = service.getOne(id);
        NhanVienRequest nhanVienRequest = new NhanVienRequest();
        nhanVienRequest.setId(nhanVien.getId());
        nhanVienRequest.setMa(nhanVien.getMa());
        nhanVienRequest.setTen(nhanVien.getTen());
        nhanVienRequest.setSdt(nhanVien.getSdt());
        nhanVienRequest.setEmail(nhanVien.getEmail());
        nhanVienRequest.setDiaChi(nhanVien.getDiaChi());
        nhanVienRequest.setNgaySinh(nhanVien.getNgaySinh());
        nhanVienRequest.setNgayTao(nhanVien.getNgayTao());
        nhanVienRequest.setNgaySua(nhanVien.getNgaySua());
        nhanVienRequest.setNguoiTao(nhanVien.getNguoiTao());
        nhanVienRequest.setNguoiSua(nhanVien.getNguoiSua());
        nhanVienRequest.setMatKhau(nhanVien.getMatKhau());
        nhanVienRequest.setVaiTro(nhanVien.getVaiTro());
        nhanVienRequest.setGioiTinh(nhanVien.getGioiTinh());
        nhanVienRequest.setTrangThai(nhanVien.getTrangThai());

        return ResponseEntity.ok(nhanVienRequest);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody NhanVien nhanVien) throws IOException, SQLException {
        String ma = "NV" + new Random().nextInt(100000);
        nhanVien.setMa(ma);
        nhanVien.setNgayTao(new Date());
//        String matKhauMoi = generateRandomPassword(8);
//        nhanVien.setMatKhau(matKhauMoi);

//        // Gửi email chứa mật khẩu mới
//        String subject = "Thông tin tài khoản";
//        String body = "<h2>Thông tin tài khoản của bạn</h2>"
//                + "<p>Xin chào, " + ten + "</p>"
//                + "<p>Chúng tôi gửi thông tin truy cập hệ thông của bạn:</p>"
//                + "<p>Tên đăng nhập: " + email + "</p>"
//                + "<p>Mật khẩu truy cập tạm thời là: <strong>" + matKhauMoi + "</strong></p>"
//                + "<p>Lưu ý: Đây là mật khẩu mặc định được tạo bởi hệ thống, bạn vui lòng đổi lại để đảm bảo an toàn thông tin</p>"
//                + "<p>Đây là email tự động vui lòng không trả lời.</p>";
//        emailService.sendEmail(email, subject, body);
        return ResponseEntity.ok().body(service.add(nhanVien));
    }

    private String generateRandomPassword(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * characters.length());
            password.append(characters.charAt(index));
        }

        return password.toString();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id,@RequestBody NhanVien nv) throws IOException, SQLException {
        nv.setId(id);
        nv.setNgaySua(new Date());
        nv.setNgayTao(nv.getNgayTao());
        nv.setNgaySinh(nv.getNgaySinh());
        nv.setEmail(nv.getEmail());
        nv.setMa(nv.getMa());
        nv.setTen(nv.getTen());
        nv.setMatKhau(nv.getMatKhau());
        nv.setGioiTinh(nv.getGioiTinh());
        nv.setSdt(nv.getSdt());
        nv.setTrangThai(nv.getTrangThai());
        nv.setDiaChi(nv.getDiaChi());
        nv.setVaiTro(nv.getVaiTro());

        return ResponseEntity.ok().body(service.add(nv));
    }

    @GetMapping("/searchNV")
    public ResponseEntity<?> search(@RequestParam(value = "key", required = false) String key,
                                    @RequestParam(value = "trangThai", required = false) Integer trangThai,
                                    @RequestParam(defaultValue = "0") Integer page) throws IOException {
        Pageable pageable = PageRequest.of(page, 5);
        Page<NhanVien> nhanVienPage = service.searchNhanVienPage(key, trangThai, pageable);

        return ResponseEntity.ok()
                .body(nhanVienPage);
    }


    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok("thành công");
    }
}
