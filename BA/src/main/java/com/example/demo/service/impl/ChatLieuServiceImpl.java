package com.example.demo.service.impl;

import com.example.demo.entity.ChatLieu;
import com.example.demo.repository.ChatLieuRepository;
import com.example.demo.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ChatLieuServiceImpl implements ChatLieuService {
    @Autowired
    private ChatLieuRepository chatLieuRepository;

    @Override
    public Page<ChatLieu> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return chatLieuRepository.findAll(pageable);
    }

    @Override
    public Page<ChatLieu> pageSearchMS(String key, Integer trangThai, Pageable pageable) {
        return chatLieuRepository.searchPageMS(key,trangThai,pageable);
    }

    @Override
    public List<ChatLieu> fillAll() {
        return chatLieuRepository.getAll();
    }

    @Override
    public ChatLieu getOne(UUID id) {
        return chatLieuRepository.findById(id).orElse(null);
    }

    @Override
    public ChatLieu detail(UUID id) {
        return chatLieuRepository.findById(id).orElse(null);
    }

    @Override
    public ChatLieu add(ChatLieu chatLieu) {
        chatLieu.setMa(chatLieu.getMa());
        chatLieu.setTen(chatLieu.getTen());
        chatLieu.setTrangThai(chatLieu.getTrangThai());
        chatLieu.setNgayTao(new Date());
        return chatLieuRepository.save(chatLieu);
    }

    @Override
    public ChatLieu update(ChatLieu chatLieu) {
        ChatLieu c = detail(chatLieu.getId());
        chatLieu.setId(chatLieu.getId());
        chatLieu.setMa(c.getMa());
        chatLieu.setTen(chatLieu.getTen());
        chatLieu.setTrangThai(chatLieu.getTrangThai());
        chatLieu.setNgayTao(chatLieu.getNgayTao());
        chatLieu.setNgaySua(new Date());
        return chatLieuRepository.save(chatLieu);
    }


    @Override
    public ChatLieu delete(UUID id) {
        ChatLieu chatLieu1 = chatLieuRepository.findById(id).orElse(null);
        chatLieu1.setTrangThai(1);
        chatLieu1.setNgaySua(new Date());
      chatLieu1.setNgayTao(chatLieu1.getNgayTao());
        chatLieu1.setTen(chatLieu1.getMa());
        return chatLieuRepository.save(chatLieu1);
    }

    @Override
    public List<ChatLieu> findByChatLieuString(List<String> chatLieusString) {
        List<ChatLieu> chatLieus = new ArrayList<>();
        for (String clString: chatLieusString) {
            ChatLieu chatLieu = chatLieuRepository.findByTen(clString);
            chatLieus.add(chatLieu);
        }
        return chatLieus;
    }
}
