package com.example.demo.service.impl;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.repository.ChiTietSanPhamRepository;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.repository.HoaDonRespository;
import com.example.demo.response.HoaDonCustom;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class HoaDonServiceImpl implements HoaDonService {
    @Autowired
    public HoaDonRespository res;
    @Autowired
    private ChiTietSanPhamRepository resCTSP;

    @Autowired
    private HoaDonChiTietRepository resHDCT;
    @Override
    public List<HoaDon> listHD() {
        return res.getAllHD();
    }

    @Override
    public List<String> listDoiHang(UUID idHD) {
        return res.doiHang(idHD);
    }

    @Override
    public List<HoaDonChiTiet> listYCDoiHang(UUID idHD) {
        return resHDCT.getAllByIdHDAndIdTHAndSLYCD(idHD);
    }

    @Override
    public List<String> YCDoiHang(UUID idHD) {
        return res.doiHangYC(idHD);
    }

    @Override
    public List<HoaDon> searchByTrangThai(Integer[] trangThai, UUID idKH) {
        return res.searchByTrangThai(trangThai, idKH);
    }

    @Override
    public Page<HoaDon> pageHD(Pageable pageable) {
        return res.findAll(pageable);
    }

    @Override
    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable) {
        return res.hienThiPageHD(pageable);
    }

    @Override
    public Page<HoaDonCustom> searchVIP(String key, Date tuNgay, Date denNgay, Integer trangThai,
                                        Integer loaiDon, Double minSL, Double maxSL, Double minTT,
                                        Double maxTT, Pageable pageable) {
        return res.findVIP(key, tuNgay, denNgay, trangThai, loaiDon, minSL, maxSL, minTT, maxTT, pageable);
    }

    @Override
    public List<ChiTietSanPham> getAllSP() {
        return resCTSP.getAllSP();
    }

    @Override
    public Double doanhThuTongNgayCurrent() {
        return res.doanhThuTongNgayCurrent();
    }

    @Override
    public String[] doanhThuAllNgay() {
        return res.doanhThuAllNgay();
    }

    @Override
    public List<String> bieuDoNam() {
        return res.bieuDoNam();
    }

    @Override
    public List<String> bieuDoNgay() {
        return res.bieuDoNgay();
    }

    @Override
    public List<String> bieuDoThang() {
        return res.bieuDoThang();
    }

    @Override
    public String[] doanhThuAllThang() {
        return res.doanhThuAllThang();
    }

    @Override
    public String[] doanhThuAllNam() {
        return res.doanhThuAllNam();
    }

    @Override
    public Double doanhThuTongThangCurrent() {
        return res.doanhThuTongThangCurrent();
    }

    @Override
    public Double doanhThuTongNamCurrent() {
        return res.doanhThuTongNamCurrent();
    }

    @Override
    public Double doanhThuTaiQuayNgayCurrent() {
        return res.doanhThuTaiQuayNgayCurrent();
    }

    @Override
    public Double doanhThuTaiQuayThangCurrent() {
        return res.doanhThuTaiQuayThangCurrent();
    }

    @Override
    public Double doanhThuTaiQuayNamCurrent() {
        return res.doanhThuTaiquayNamCurrent();
    }

    @Override
    public Double doanhThuOnlineNgayCurrent() {
        return res.doanhThuOnlineNgayCurrent();
    }

    @Override
    public Double doanhThuOnlineThangCurrent() {
        return res.doanhThuOnlineThangCurrent();
    }

    @Override
    public Double doanhThuOnlineNamCurrent() {
        return res.doanhThuOnlineNamCurrent();
    }

    @Override
    public Integer soDonHuyNgay() {
        return res.soDonHuyNgay();
    }

    @Override
    public Integer soDonHuyThang() {
        return res.soDonHuyThang();
    }

    @Override
    public Integer soDonTraThang() {
        return res.soDonTraThang();
    }

    @Override
    public Integer soDonHuyNam() {
        return res.soDonHuyNam();
    }

    @Override
    public Integer soDonTraNam() {
        return res.soDonTraNam();
    }

    @Override
    public Integer soDonChoXacNhanNgay() {
        return res.soDonChoXacNhanNgay();
    }

    @Override
    public Integer soDonChoXacNhanThang() {
        return res.soDonChoXacNhanThang();
    }

    @Override
    public Integer soDonChoXacNhanNam() {
        return res.soDonChoXacNhanNam();
    }

    @Override
    public Integer soDonThanhCongNgay() {
        return res.soDonThanhCongNgay();
    }

    @Override
    public Integer soDonThanhCongThang() {
        return res.soDonThanhCongThang();
    }

    @Override
    public Integer soDonThanhCongNam() {
        return res.soDonThanhCongNam();
    }

    @Override
    public List<String> sanPhamBanChayTrongNgay() {
        return res.sanPhamBanChayTrongNgay();
    }

    @Override
    public List<String> sanPhamBanChayTrongNgaySearch(String key) {
        return res.sanPhamBanChayTrongNgaySearchTenSP(key);
    }

    @Override
    public List<String> sanPhamBanChayTrongThang() {
        return res.sanPhamBanChayTrongThang();
    }

    @Override
    public List<String> sanPhamBanChayTrongThangSearch(String key) {
        return res.sanPhamBanChayTrongThangSearchTenSP(key);
    }

    @Override
    public List<String> sanPhamBanChayTrongNam() {
        return res.sanPhamBanChayTrongNam();
    }

    @Override
    public List<String> sanPhamBanChayTrongNamSearch(String key) {
        return res.sanPhamBanChayTrongNamSearchTenSP(key);
    }

    @Override
    public List<ChiTietSanPham> searchSPofHDCT(String key) {
        return resCTSP.searchSPofHDCT(key);
    }

    @Override
    public HoaDon detailHD(UUID id) {
        return res.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        res.deleteById(id);
    }

    @Override
    public void updateHD(UUID id, String tenNguoiNhan, String soDienThoai,
                           String diaChi, String tinh,
                           String huyen, String xa,Double tongTien,
                           Double tongTienKhiGiam,Double tienShip) {
        res.updateHD(id, tenNguoiNhan, soDienThoai, diaChi,tinh,
                huyen,xa,tongTien,tongTienKhiGiam,tienShip);
    }

    @Override
    public HoaDon add(HoaDon hoaDon) {
        return res.save(hoaDon);
    }
}
