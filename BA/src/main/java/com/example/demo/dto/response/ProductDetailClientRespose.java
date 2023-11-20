package com.example.demo.dto.response;


import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface ProductDetailClientRespose {

    @Value("#{target.id}")
    UUID getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.tenChatLieu}")
    String getTenChatLieu();

    @Value("#{target.tenNhaSanXuat}")
    String getTenNhaSanXuat();

    @Value("#{target.tenSize}")
    String getTenSize();

    @Value("#{target.tenMau}")
    String getTenMau();

    @Value("#{target.tenLoaiSanPham}")
    String getTenLoaiSanPham();

    @Value("#{target.tenCoAo}")
    String getTenCoAO();

    @Value("#{target.idSanPham}")
    String getIdSanPham();
}
