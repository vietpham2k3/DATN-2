package com.example.demo.service;

import com.example.demo.entity.KichCo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface KichCoService {
    List<KichCo> getAll();

    public Page<KichCo> pageSearchKC(String key, Integer trangThai, Pageable pageable);

    Page<KichCo> fillAll(Integer page);

     KichCo getOne(UUID id);

    public KichCo detail(UUID id);

    KichCo add(KichCo kichCo);

    KichCo update(KichCo kichCo);

    KichCo delete(UUID id);

    List<KichCo> findByKichCoString (List<String> kichCos);
}
