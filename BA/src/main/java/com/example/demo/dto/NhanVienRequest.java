package com.example.demo.dto;

import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class NhanVienRequest {
    private UUID id;

    private String ma;

    private String ten;

    private String sdt;

    private String email;

    private String diaChi;

    private Date ngaySinh;

    private Date ngayTao;

    private Date ngaySua;

    private String nguoiTao;

    private String nguoiSua;

    private String matKhau;

    private Integer vaiTro;

    private Integer trangThai;

    private Boolean gioiTinh;
}
