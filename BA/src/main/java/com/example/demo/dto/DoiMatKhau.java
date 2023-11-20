package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter

public class DoiMatKhau {
    private  UUID id;
    private String currentPassword;
    private String newPassword;
    private String confirmPassword;

}
