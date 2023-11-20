package com.example.demo.service;

import com.example.demo.entity.ChatLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface ChatLieuService {
    Page<ChatLieu> getAll(Integer page);

    public Page<ChatLieu> pageSearchMS(String key, Integer trangThai, Pageable pageable);

    List<ChatLieu> fillAll();

    ChatLieu getOne(UUID id);

    public ChatLieu detail(UUID id);

    ChatLieu add(ChatLieu chatLieu);

    ChatLieu update(ChatLieu chatLieu);

    ChatLieu delete(UUID id);

    List<ChatLieu> findByChatLieuString (List<String> chatLieus);
}
