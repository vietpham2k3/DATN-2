package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/gio-hang")
public class GioHangController {

    @Autowired
    private GioHangServiceImpl gioHangService;
    @Autowired
    private GioHangChiTietServiceImpl gioHangChiTietService;
    @Autowired
    public HoaDonServiceImpl serviceHD;
    @Autowired
    public HoaDon_KhuyenMaiServiceImpl hoaDon_khuyenMaiService;
    @Autowired
    public LichSuHoaDonServiceImpl serviceLSHD;
    @Autowired
    public HoaDonChiTietServiceImpl hoaDonChiTietService;
    @Autowired
    public HinhThucThanhToanServiceImpl serviceHttt;
    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;
    @Autowired
    private KhachHangServiceImpl khService;
    @Autowired
    private KhuyenMaiServiceImpl khuyenMaiService;

    @GetMapping("/countSP")
    public ResponseEntity<?> countSP(@RequestParam(required = false) UUID id) {
        return ResponseEntity.ok(gioHangChiTietService.countSPOnGH(id));
    }

    @GetMapping("/detailGH")
    public ResponseEntity<?> detailGH(@RequestParam(required = false) UUID id) {
        return ResponseEntity.ok(gioHangService.getAll(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(@RequestParam UUID id) {
        return ResponseEntity.ok(gioHangChiTietService.getAll(id));
    }

    @DeleteMapping("/deleteSPInGH/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        GioHangChiTiet hd = gioHangChiTietService.findById(id);
        ChiTietSanPham sp = chiTietSanPhamService.detail(hd.getChiTietSanPham().getId());
        chiTietSanPhamService.update(sp.getSoLuong() + hd.getSoLuong(), sp.getId());
        gioHangChiTietService.delete(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clearGH/{id}/{idHD}")
    public ResponseEntity<?> clearGH(@PathVariable UUID id, @PathVariable UUID idHD) {
        List<GioHangChiTiet> list = gioHangChiTietService.getAll(id);
        List<HoaDonChiTiet> listHD = hoaDonChiTietService.getAll(idHD);
        for (GioHangChiTiet gioHangChiTiet : list) {
            for (HoaDonChiTiet hd : listHD) {
                if (gioHangChiTiet.getGioHang().getId().equals(id)
                        && hd.getChiTietSanPham().getId().equals(gioHangChiTiet.getChiTietSanPham().getId())
                        && hd.getHoaDon().getId().equals(idHD)) {
                    gioHangChiTietService.delete(gioHangChiTiet.getId());
                }
            }
        }
        return ResponseEntity.ok().build();
    }


    @PutMapping("update-sl/{id}")
    public ResponseEntity<?> updateSL(@PathVariable UUID id, @RequestBody GioHangChiTiet hoaDon) {
        GioHangChiTiet hd = gioHangChiTietService.findById(id);
        ChiTietSanPham sp = chiTietSanPhamService.detail(hoaDon.getChiTietSanPham().getId());
        if (hoaDon.getSoLuong() > hd.getSoLuong()) {
            chiTietSanPhamService.update(sp.getSoLuong() - (hoaDon.getSoLuong() - hd.getSoLuong()), hoaDon.getChiTietSanPham().getId());
            gioHangChiTietService.updateSL(hoaDon.getSoLuong(), hd.getId());
            return ResponseEntity.ok("Tang cthd, giam ctsp");
        } else {
            // Không tìm thấy cặp id hoá đơn và id sản phẩm trong cơ sở dữ liệu, thực hiện thêm mới
            chiTietSanPhamService.update(sp.getSoLuong() + (hd.getSoLuong() - hoaDon.getSoLuong()), hoaDon.getChiTietSanPham().getId());
            gioHangChiTietService.updateSL(hoaDon.getSoLuong(), hd.getId());
            return ResponseEntity.ok("Giam cthd, tang ctsp");
        }
    }

    @PutMapping("update-hd-checkout/{id}")
    public ResponseEntity<?> updateHD(@RequestBody HoaDon hoaDon, @PathVariable UUID id, @RequestParam String nguoiTao) {
        String ma = "HTTT" + new Random().nextInt(100000);
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hd = serviceHD.detailHD(id);
        HinhThucThanhToan httt = new HinhThucThanhToan().builder()
                .ma(ma)
                .ten(hoaDon.getHinhThucThanhToan().getTen())
                .ngayTao(new Date())
                .trangThai(hoaDon.getHinhThucThanhToan().getTrangThai())
                .tien(hoaDon.getHinhThucThanhToan().getTien())
                .build();
        hoaDon.setId(id);
        hoaDon.setNgayTao(hd.getNgayTao());
        hoaDon.setNgayThanhToan(new Date());
        hoaDon.setNgaySua(new Date());
        hoaDon.setMa(hd.getMa());
        hoaDon.setLoaiDon(1);
        hoaDon.setTenNguoiNhan(hoaDon.getTenNguoiNhan());
        hoaDon.setSoDienThoai(hoaDon.getSoDienThoai());
        hoaDon.setDiaChi(hoaDon.getDiaChi());
        hoaDon.setTinh(hoaDon.getTinh());
        hoaDon.setHuyen(hoaDon.getHuyen());
        hoaDon.setXa(hoaDon.getXa());
        httt = serviceHttt.add(httt);
        hoaDon.setHinhThucThanhToan(httt);
        if (httt.getTen().equalsIgnoreCase("VNPay")) {
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon().builder()
                    .ma(maLSHD)
                    .ten("Thanh toán thành công")
                    .trangThai(6)
                    .ngayTao(new Date())
                    .nguoiTao(nguoiTao)
                    .ghiChu("Thanh toán thành công")
                    .hoaDon(hd)
                    .build();
            serviceLSHD.createLichSuDonHang(lichSuHoaDon);
        }
        return ResponseEntity.ok(serviceHD.add(hoaDon));
    }

    @PostMapping("/add-km")
    public ResponseEntity<?> addkm(@RequestBody HoaDon_KhuyenMai khuyenMai) {
        List<KhuyenMai> list = khuyenMaiService.getAllKM(khuyenMai.getKhuyenMai().getTien());
        boolean isValid = false;
        List<HoaDon_KhuyenMai> listHD = hoaDon_khuyenMaiService.getAll(khuyenMai.getHoaDon().getId());
        for (HoaDon_KhuyenMai h : listHD) {
            if (khuyenMai.getKhuyenMai().getMa().equalsIgnoreCase(h.getKhuyenMai().getMa())) {
                return ResponseEntity.ok("ff");
            }
        }
        double sum = 0;
        List<HoaDonChiTiet> listHDCT = hoaDonChiTietService.getAll(khuyenMai.getHoaDon().getId());
        for (HoaDonChiTiet hoaDonChiTiet : listHDCT) {
            sum += hoaDonChiTiet.getSoLuong() * hoaDonChiTiet.getDonGia();
        }

        for (KhuyenMai k : list) {
            if (khuyenMai.getKhuyenMai().getMa().equalsIgnoreCase(k.getMa())) {
                if (k.getLoaiGiam() == true) {
                    khuyenMai.setTienGiam(k.getMucGiam());
                    khuyenMai.setKhuyenMai(k);
                    isValid = true;
                    break;
                } else {
                    khuyenMai.setTienGiam((k.getMucGiam() * sum) / 100);
                    khuyenMai.setKhuyenMai(k);
                    isValid = true;
                    break;
                }
            }
        }

        if (!isValid) {
            return ResponseEntity.ok("error");
        }


        return ResponseEntity.ok(hoaDon_khuyenMaiService.add(khuyenMai));
    }


    @PostMapping("/tao-hoa-don")
    public ResponseEntity<String> themHoaDonChiTiet(@RequestParam String nguoiTao, @RequestBody List<HoaDonChiTiet> hoaDonChiTietList) {
        String ma = "HD" + new Random().nextInt(100000);
        String maLSHD = "LSHD" + new Random().nextInt(100000);

        HoaDon hoaDon = new HoaDon().builder()
                .ma(ma)
                .ngayTao(new Date())
                .loaiDon(1)
                .trangThai(0)
                .build();
        hoaDon = serviceHD.add(hoaDon);
        for (HoaDonChiTiet hd : hoaDonChiTietList) {
            hd.setHoaDon(hoaDon);
        }
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon().builder()
                .ma(maLSHD)
                .ten("Đã đặt đơn hàng")
                .trangThai(0)
                .nguoiTao(nguoiTao)
                .ngayTao(new Date())
                .hoaDon(hoaDon)
                .ghiChu("Đã đặt đơn hàng")
                .build();
        serviceLSHD.createLichSuDonHang(lichSuHoaDon);
        hoaDonChiTietService.taoHoaDon(hoaDonChiTietList);
        return ResponseEntity.ok(String.valueOf(hoaDon.getId()));
    }

    @PostMapping("/them-gio-hang")
    public ResponseEntity<?> themGioHang(@RequestParam UUID idKH, @RequestBody GioHangChiTiet gioHangChiTiet) {
        String ma = "GH" + new Random().nextInt(100000);
        KhachHang khachHang = khService.getOne(idKH);
        ChiTietSanPham ctsp = chiTietSanPhamService.detail(gioHangChiTiet.getChiTietSanPham().getId());

        // Kiểm tra xem có sẵn giỏ hàng cho khách hàng chưa
        GioHang gioHang = gioHangService.getAll(idKH);

        if (gioHang == null) {
            // Nếu chưa có giỏ hàng, tạo mới
            gioHang = new GioHang().builder()
                    .ma(ma)
                    .khachHang(khachHang)
                    .ngayTao(new Date())
                    .trangThai(0)
                    .tenNguoiNhan(khachHang.getTenKhachHang())
                    .build();
            gioHang = gioHangService.add(gioHang);
        }

        List<GioHangChiTiet> list = gioHangChiTietService.getAll(gioHang.getId());
        boolean productExistsInCart = false;

        for (GioHangChiTiet gioHangChiTiet1 : list) {
            if (gioHangChiTiet1.getChiTietSanPham().getId().equals(gioHangChiTiet.getChiTietSanPham().getId())) {
                // Nếu sản phẩm tương tự đã tồn tại trong giỏ hàng, cập nhật số lượng
                gioHangChiTiet1.setSoLuong(gioHangChiTiet1.getSoLuong() + gioHangChiTiet.getSoLuong());
                gioHangChiTiet.setGioHang(gioHang);
                gioHangChiTiet.setChiTietSanPham(gioHangChiTiet.getChiTietSanPham());
                gioHangChiTiet.setDonGia(ctsp.getGiaBan());
                gioHangChiTietService.add(gioHangChiTiet1); // Cập nhật chi tiết giỏ hàng
                chiTietSanPhamService.update(ctsp.getSoLuong() - gioHangChiTiet.getSoLuong(), gioHangChiTiet.getChiTietSanPham().getId());
                productExistsInCart = true;
                break;
            }
        }

        if (!productExistsInCart) {
            gioHangChiTiet.setGioHang(gioHang);
            gioHangChiTiet.setChiTietSanPham(gioHangChiTiet.getChiTietSanPham());
            gioHangChiTiet.setDonGia(ctsp.getGiaBan());
            gioHangChiTiet.setSoLuong(gioHangChiTiet.getSoLuong());
            chiTietSanPhamService.update(ctsp.getSoLuong() - gioHangChiTiet.getSoLuong(), gioHangChiTiet.getChiTietSanPham().getId());
            gioHangChiTietService.add(gioHangChiTiet); // Thêm chi tiết giỏ hàng
        }

        return ResponseEntity.ok(gioHangChiTiet);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteByIdHD(@PathVariable UUID id) {
        hoaDonChiTietService.deleteByIdHD(id);
        return ResponseEntity.ok("Thành công");
    }

}
