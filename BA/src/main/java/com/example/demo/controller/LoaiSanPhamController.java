package com.example.demo.controller;

import com.example.demo.entity.LoaiSanPham;
import com.example.demo.service.impl.LoaiSanPhamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Random;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/loai-san-pham")
public class LoaiSanPhamController {

    @Autowired
    private LoaiSanPhamServiceImpl service;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/getAllPages")
    public ResponseEntity<?> getAllPages(@RequestParam(defaultValue = "0") Integer page) {
        return ResponseEntity.ok(service.getAllPages(page));
    }

    @GetMapping("/searchPage")
    public ResponseEntity<?> searchPage(@RequestParam(value = "key", required = false) String key,
                                        @RequestParam(value = "trangThai", required = false) Integer trangThai,
                                        @RequestParam(defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ResponseEntity.ok(service.searchPage(key, trangThai, pageable));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody LoaiSanPham loaiSanPham) {
        String ma = "Loai" + new Random().nextInt(100000);
        loaiSanPham.setMa(ma);
        loaiSanPham.setNgayTao(new Date());
        return ResponseEntity.ok(service.add(loaiSanPham));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        return ResponseEntity.ok(service.detail(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id,
                                    @RequestBody LoaiSanPham loaiSanPham) {
        loaiSanPham.setId(id);
        loaiSanPham.setTen(loaiSanPham.getTen());
        loaiSanPham.setNgayTao(loaiSanPham.getNgayTao());
        loaiSanPham.setNgaySua(new Date());
        return ResponseEntity.ok(service.add(loaiSanPham));
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        return ResponseEntity.ok(service.delete(id));
    }

}
