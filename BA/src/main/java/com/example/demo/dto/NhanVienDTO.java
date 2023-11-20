package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class NhanVienDTO {
    private UUID id;

    private String ten;

    private String email;

    private String matKhau;

    private String role;
}
