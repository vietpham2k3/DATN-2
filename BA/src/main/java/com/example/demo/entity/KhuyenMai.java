package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "KhuyenMai")
public class KhuyenMai {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @Column(name = "ma")
    private String ma;

    @Column(name = "ten")
    @NotBlank(message = "Không được để trống")
    private String ten;

    @Column(name = "muc_giam")
    @NotNull(message = "Không được để trống")
    @Min(value = 0, message = "Không được nhỏ hơn 0")
    private Double mucGiam;

    @Column(name = "so_tien_toi_thieu_giam")
    @NotNull(message = "Không được để trống")
    @Min(value = 0)
    private Double tien;

    @Column(name = "thoi_gian_bat_dau")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
//    @NotNull(message = "Không được để trống")
    @Temporal(TemporalType.TIMESTAMP)
    private Date thoiGianBatDau;

    @Column(name = "thoi_gian_ket_thuc")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
//    @NotNull(message = "Không được để trống")
    @Temporal(TemporalType.TIMESTAMP)
    private Date thoiGianKetThuc;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @Column(name = "ngay_tao")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'hh:mm")
    private Date ngayTao;

    @Column(name = "ngay_sua")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'hh:mm")
    private Date ngaySua;

    @Column(name = "nguoi_tao")
    private String nguoiTao;

    @Column(name = "nguoi_sua")
    private String nguoiSua;

    @Column(name = "loai_giam")
    private Boolean loaiGiam;
}
