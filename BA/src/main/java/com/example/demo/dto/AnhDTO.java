package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnhDTO {
    private UUID id;
    private String ma;
    private String tenBase64; // Trường mới để lưu trữ dữ liệu ảnh dưới dạng Base64
    private Integer trangThai;
    private Date ngayTao;
    private Date ngaySua;
    private String chiTietSanPhamTen;
}