package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "HoaDonChiTiet")
public class HoaDonChiTiet {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_hd", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private HoaDon hoaDon;

    @ManyToOne
    @JoinColumn(name = "id_ctsp", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private ChiTietSanPham chiTietSanPham;

    @Column(name = "don_gia")
    private Double donGia;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "so_luong_hang_doi")
    private Integer soLuongHangDoi;

    @Column(name = "so_luong_yeu_cau_doi")
    private Integer soLuongYeuCauDoi;

    @Column(name = "so_luong_hang_loi")
    private Integer soLuongHangLoi;

}
