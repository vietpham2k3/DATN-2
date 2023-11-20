package com.example.demo.controller;

import com.example.demo.entity.MauSac;
import com.example.demo.service.impl.MauSacServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/mau-sac/")
@CrossOrigin(origins = "http://localhost:3000")
public class MauSacController {
    @Autowired public
    MauSacServiceImpl service;

    @GetMapping("hien-thi")
    public ResponseEntity<?> hienThi(){
        return ResponseEntity.ok(service.getAllMS());
    }

    @GetMapping("hien-thi-page")
    public ResponseEntity<?> hienThiPage(@RequestParam (defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(service.pageMS(pageable));
    }

    @GetMapping("hien-thi-page-search")
    public ResponseEntity<?> hienThiPageSearch(String key,Integer trangThai,@RequestParam (defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(service.pageSearchMS(key,trangThai,pageable));
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody MauSac mauSac){
        mauSac.setNgayTao(new Date());
        return ResponseEntity.ok(service.add(mauSac));
    }
    
    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id){
        return ResponseEntity.ok(service.detail(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id,
                                    @RequestBody MauSac mauSac){
        mauSac.setId(id);
        mauSac.setNgayTao(mauSac.getNgayTao());
        mauSac.setNgaySua(new Date());
        return ResponseEntity.ok(service.add(mauSac));
    }

    @PutMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id,
                                    @RequestBody MauSac mauSac){
        mauSac.setId(id);
        return ResponseEntity.ok(service.xoa(id));
    }

}
