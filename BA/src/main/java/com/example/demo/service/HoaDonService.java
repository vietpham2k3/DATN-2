package com.example.demo.service;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.response.HoaDonCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface HoaDonService {

    List<HoaDon> listHD();

    List<String> listDoiHang(UUID idHD);

    List<HoaDonChiTiet> listYCDoiHang(UUID idHD);

    List<String> YCDoiHang(UUID idHD);

    List<HoaDon> searchByTrangThai(Integer[] trangThai, UUID idKH);

    Page<HoaDon> pageHD(Pageable pageable);

    Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    public Page<HoaDonCustom> searchVIP(String key, Date tuNgay, Date denNgay, Integer trangThai,
                                        Integer loaiDon, Double minSL, Double maxSL, Double minTT,
                                        Double maxTT, Pageable pageable);

    public List<ChiTietSanPham> getAllSP();

    public Double doanhThuTongNgayCurrent();

    public String[] doanhThuAllNgay();

    public List<String> bieuDoNam();

    public List<String> bieuDoNgay();

    public List<String> bieuDoThang();

    public String[] doanhThuAllThang();

    public String[] doanhThuAllNam();

    public Double doanhThuTongThangCurrent();

    public Double doanhThuTongNamCurrent();

    public Double doanhThuTaiQuayNgayCurrent();

    public Double doanhThuTaiQuayThangCurrent();

    public Double doanhThuTaiQuayNamCurrent();

    public Double doanhThuOnlineNgayCurrent();

    public Double doanhThuOnlineThangCurrent();

    public Double doanhThuOnlineNamCurrent();

    public Integer soDonHuyNgay();

    public Integer soDonHuyThang();

    public Integer soDonTraThang();

    public Integer soDonHuyNam();

    public Integer soDonTraNam();

    public Integer soDonChoXacNhanNgay();

    public Integer soDonChoXacNhanThang();

    public Integer soDonChoXacNhanNam();

    public Integer soDonThanhCongNgay();

    public Integer soDonThanhCongThang();

    public Integer soDonThanhCongNam();

    public List<String> sanPhamBanChayTrongNgay();

    public List<String> sanPhamBanChayTrongNgaySearch(String key);

    public List<String> sanPhamBanChayTrongThang();

    public List<String> sanPhamBanChayTrongThangSearch(String key);

    public List<String> sanPhamBanChayTrongNam();

    public List<String> sanPhamBanChayTrongNamSearch(String key);

    public List<ChiTietSanPham> searchSPofHDCT(String key);

    HoaDon detailHD(UUID id);

    void delete(UUID id);

    public void updateHD(UUID id, String tenNguoiNhan, String soDienThoai,
                         String diaChi, String tinh,
                         String huyen, String xa, Double tongTien,
                         Double tongTienKhiGiam, Double tienShip);

    HoaDon add(HoaDon hoaDon);
}
