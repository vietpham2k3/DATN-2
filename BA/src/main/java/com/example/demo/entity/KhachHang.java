package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.sql.Blob;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="KhachHang")
public class KhachHang implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private UUID id;

    @Column(name="ma")
    private String maKhachHang;

    @Column(name="ten")
    private String tenKhachHang;

    @Column(name="sdt")
    private String sdt;

    @Column(name="email")
    private String email;

    @Column(name="ngay_sinh")
    private Date ngaySinh;

    @Column(name="mat_khau")
    private String matKhau;


    @Column(name="trang_thai")
    private Integer trangThai;

    @Column(name="gioi_tinh")
    private Boolean gioiTinh;

    @Column(name="anh")
    @Lob
    @JsonIgnore
    private Blob anh;

}
