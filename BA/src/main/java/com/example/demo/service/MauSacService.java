package com.example.demo.service;

import com.example.demo.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface MauSacService {
    public List<MauSac> getAllMS();

    public Page<MauSac> pageMS(Pageable pageable);

    public Page<MauSac> pageSearchMS(String key,Integer trangThai,Pageable pageable);

    public MauSac add(MauSac mauSac);

    public MauSac detail(UUID id);

    public MauSac xoa(UUID id);

    List<MauSac> findByListString (List<String> msacString) ;
}
