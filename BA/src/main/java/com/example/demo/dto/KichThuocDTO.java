package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class KichThuocDTO {
    private String id;
    private String ma;
    private String ten;
    private Integer trangThai;
    private Date ngayTao;
    private Date ngaySua;
    private String chiTietSanPham;

//    public KichCo map(KichCo kichCo){
//        kichCo.setMa(this.getMa());
//        kichCo.setTrangThai(this.getTrangThai());
//        kichCo.setNgayTao(new Date());
//        kichCo.setChiTietSanPham(ChiTietSanPham.builder().id(UUID.fromString(chiTietSanPham)).build());
//        return kichCo;
//    }
//    public KichCo mapupdate(KichCo kichCo){
////        kichCo.setId(UUID.fromString(id));
//        kichCo.setMa(this.getMa());
//        kichCo.setTrangThai(this.getTrangThai());
//        kichCo.setNgayTao(this.getNgayTao());
//        kichCo.setNgaySua(new Date());
//        kichCo.setChiTietSanPham(ChiTietSanPham.builder().id(UUID.fromString(chiTietSanPham)).build());
//        return kichCo;
//    }
}
