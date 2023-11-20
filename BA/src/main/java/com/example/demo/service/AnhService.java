package com.example.demo.service;

import com.example.demo.entity.Anh;

import java.util.List;
import java.util.UUID;

public interface AnhService {

    Anh viewById(UUID id);

    Anh add(Anh anh);

    List<Anh> getAllByChiTietSanPhamId(UUID id);

    void delete(UUID id);
}
