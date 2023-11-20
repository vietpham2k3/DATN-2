package com.example.demo.controller;

import com.example.demo.entity.KhuyenMai;
import com.example.demo.service.impl.KhuyenMaiServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/api/khuyen-mai/")
@CrossOrigin(origins = "http://localhost:3000")
public class KhuyenMaiController {
    @Autowired
    private KhuyenMaiServiceImpl service;

    @GetMapping("hien-thi")
    public ResponseEntity<?> hienThi(@RequestParam("tien") Double tien) {
        return ResponseEntity.ok(service.getAllKM(tien));
    }

    @GetMapping("hien-thi-page")
    public ResponseEntity<?> hienthiPage(@RequestParam(defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ResponseEntity.ok(service.pageKM(pageable));
    }

    @GetMapping("hien-thi-page-search")
    public ResponseEntity<?> hienThiPageSearch(String key, Integer trangThai, @RequestParam(defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ResponseEntity.ok(service.pageSearchKM(key, trangThai,  pageable));
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody KhuyenMai khuyenMai) {
        String ma = "KM" + new Random().nextInt(100000);
        khuyenMai.setMa(ma);
        khuyenMai.setNgayTao(new Date());
        Date today = new Date();
        if(today.before(khuyenMai.getThoiGianBatDau())){
            khuyenMai.setTrangThai(0);
        }else if(today.after(khuyenMai.getThoiGianKetThuc())){
            khuyenMai.setTrangThai(1);
        }else{
            khuyenMai.setTrangThai(2);
        }
        return ResponseEntity.ok(service.add(khuyenMai));
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        return ResponseEntity.ok(service.detail(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody KhuyenMai khuyenMai) {
        KhuyenMai km = service.detail(id);
        khuyenMai.setId(id);
        khuyenMai.setNgayTao(km.getNgayTao());
        Date today = new Date();
        if(today.before(khuyenMai.getThoiGianBatDau())){
            khuyenMai.setTrangThai(0);
        }else if(today.after(khuyenMai.getThoiGianKetThuc())){
            khuyenMai.setTrangThai(1);
        }else{
            khuyenMai.setTrangThai(2);
        }
        khuyenMai.setNgaySua(new Date());
        return ResponseEntity.ok(service.add(khuyenMai));
    }

    @PutMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id, @RequestBody KhuyenMai khuyenMai) {
        khuyenMai.setId(id);
        return ResponseEntity.ok(service.xoa(id));
    }
}
