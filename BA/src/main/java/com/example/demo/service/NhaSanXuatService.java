package com.example.demo.service;

import com.example.demo.entity.NhaSanXuat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface NhaSanXuatService {

    public List<NhaSanXuat> getAllNSX();

    public Page<NhaSanXuat> pageNSX(Pageable pageable);

    public Page<NhaSanXuat> pageSearchNSX(String key,Integer trangThai, Pageable pageable);

    public NhaSanXuat add(NhaSanXuat nhaSanXuat);

    public NhaSanXuat detail(UUID id);

    public NhaSanXuat xoa(UUID id);

    List<NhaSanXuat> findByNhaSanXuatString (List<String> nsxString) ;
}
