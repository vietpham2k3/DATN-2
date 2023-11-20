package com.example.demo.controller;

import com.example.demo.entity.NhaSanXuat;
import com.example.demo.service.impl.NhaSanXuatServiceImpl;
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
@RequestMapping("/api/nha-san-xuat")
public class NhaSanXuatController {

    @Autowired
    private NhaSanXuatServiceImpl service;

    @GetMapping("/hien-thi")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAllNSX());
    }

    @GetMapping("/hien-thi-page")
    public ResponseEntity<?> hienThiPage(@RequestParam (defaultValue = "0") Integer page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(service.pageNSX(pageable));
    }

    @GetMapping("/hien-thi-page-search")
    public ResponseEntity<?> hienThiPageSearch(String key, Integer trangThai, @RequestParam (defaultValue = "0") Integer page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(service.pageSearchNSX(key,trangThai, pageable));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody NhaSanXuat nhaSanXuat){
        String ma = "NSX" + new Random().nextInt(100000);
        nhaSanXuat.setMa(ma);
        nhaSanXuat.setNgayTao(new Date());
        return ResponseEntity.ok(service.add(nhaSanXuat));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id){
        return ResponseEntity.ok(service.detail(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody NhaSanXuat nhaSanXuat){
        NhaSanXuat c = service.detail(id);
        nhaSanXuat.setId(id);
        nhaSanXuat.setMa(c.getMa());
        nhaSanXuat.setNgayTao(nhaSanXuat.getNgayTao());
        nhaSanXuat.setNgaySua(new Date());
        return ResponseEntity.ok(service.add(nhaSanXuat));
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id, @RequestBody NhaSanXuat nhaSanXuat){
        nhaSanXuat.setId(id);
        return ResponseEntity.ok(service.xoa(id));
    }
}
