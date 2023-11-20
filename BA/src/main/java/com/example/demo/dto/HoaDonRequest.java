package com.example.demo.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class HoaDonRequest {
    private UUID id;

    private String diaChi;

    private String ma;

    private Date ngayTao;

    private Date ngayThanhToan;

    private Double tongTien;

    private Double tongTienKhiGiam;

    List<Integer> listTrangThai = new ArrayList<>();

    private String tenNguoiNhan;

    private String soDienThoai;

    private Date ngayDuKienNhan;

    private Date ngayShip;

    private Double tienShip;

    private Date ngaySua;

    private Date ngayNhan;

    private String ghiChu;

    private Integer loaiDon;

    public String ten;

    public String anh;

}
