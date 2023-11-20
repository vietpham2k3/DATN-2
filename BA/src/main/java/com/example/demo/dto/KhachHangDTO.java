package com.example.demo.dto;

import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class KhachHangDTO {

    private UUID id;
    private String maKhachHang;
    private String tenKhachHang;
    private String sdt;
    private String email;
    private Date ngaySinh;
    private String matKhau;
    private Integer trangThai;
    private Boolean gioiTinh;
    private String anh;
    private String role;

//    private DiaChi diaChi;

}
