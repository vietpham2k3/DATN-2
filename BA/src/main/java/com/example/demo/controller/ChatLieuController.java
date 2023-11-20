package com.example.demo.controller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Random;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/chatlieu")
public class ChatLieuController {
    @Autowired
    private ChatLieuService chatLieuService;

    @GetMapping("/hienthi")
    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok(chatLieuService.getAll(page));
    }

    @GetMapping("/serach")
    public ResponseEntity<?> hienThiPageSearch(String key,Integer trangThai,@RequestParam (defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(chatLieuService.pageSearchMS(key,trangThai,pageable));

    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(chatLieuService.fillAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ChatLieu chatLieu) {
        String ma = "CL" + new Random().nextInt(100000);
        chatLieu.setMa(ma);
        return ResponseEntity.ok(chatLieuService.add(chatLieu));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody ChatLieu chatLieu) {
        chatLieu.setId(id);
        return ResponseEntity.ok(chatLieuService.update(chatLieu));
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id,
                                    @RequestBody ChatLieu chatLieu) {

        chatLieu.setId(id);
        return ResponseEntity.ok(chatLieuService.delete(id));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?>     detail(@PathVariable UUID id) {
        return ResponseEntity.ok(chatLieuService.detail(id));
    }


}

