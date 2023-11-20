package com.example.demo.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class KhachHangInfo {

//    private UUID id;
    private String tenKhachHang;
    private String email;
    private Date ngaySinh;
    private Boolean gioiTinh;
}
