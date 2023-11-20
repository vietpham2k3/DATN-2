package com.example.demo.controller;

import com.example.demo.entity.KichCo;
import com.example.demo.service.ChiTietSanPhamService;
import com.example.demo.service.KichCoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/kich-co")
public class KichCoController {
    @Autowired
    private ChiTietSanPhamService chiTietSanPhamService;
    @Autowired
    private KichCoService service;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/getAllchitietsp")
    public ResponseEntity<?> getAllVaiTro() {
        return ResponseEntity.ok(chiTietSanPhamService.getAll());
    }

    @GetMapping("/hienthi")
    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok(service.fillAll(page));
    }

    @GetMapping("/serach")
    public ResponseEntity<?> hienThiPageSearch(String key, Integer trangThai, @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ResponseEntity.ok(service.pageSearchKC(key, trangThai, pageable));

    }


    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody KichCo kichCo) {
//        String maSP = "SP" + new Random().nextInt(100000);
        return ResponseEntity.ok(service.add(kichCo));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody KichCo kichCo) {
       kichCo.setId(id);
        return ResponseEntity.ok(service.update(kichCo));
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id,
                                    @RequestBody KichCo kichCo) {

        kichCo.setId(id);
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        return ResponseEntity.ok(service.detail(id));
    }

}
