package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "HoaDon")
public class HoaDon implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_tk",
            referencedColumnName = "id")
    private NhanVien nhanVien;

    @ManyToOne
    @JoinColumn(name = "id_kh",
            referencedColumnName = "id")
    private KhachHang khachHang;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "tinh")
    private String tinh;

    @Column(name = "huyen")
    private String huyen;

    @Column(name = "xa")
    private String xa;

    @Column(name = "ma")
    private String ma;

    @Column(name = "ngay_tao")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayTao;

    @Column(name = "ngay_thanh_toan")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayThanhToan;

    @Column(name = "tong_tien")
    private Double tongTien;

    @Column(name = "tong_tien_sau_khi_giam")
    private Double tongTienKhiGiam;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @Column(name = "ten_nguoi_nhan")
    private String tenNguoiNhan;

    @Column(name = "sdt")
    private String soDienThoai;

    @Column(name = "ngay_du_kien_nhan")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayDuKienNhan;

    @Column(name = "ngay_ship")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayShip;

    @Column(name = "tien_ship")
    private Double tienShip;

    @Column(name = "ngay_sua")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private Date ngaySua;

    @Column(name = "ngay_nhan")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayNhan;

    @Column(name = "ghi_chu")
    private String ghiChu;

    @Column(name = "nguoi_tao")
    private String nguoiTao;

    @Column(name = "loai_don")
    private Integer loaiDon;

    @ManyToOne
    @JoinColumn(name = "id_httt"
            ,referencedColumnName = "id")
    public HinhThucThanhToan hinhThucThanhToan;

}
