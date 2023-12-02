package com.example.demo.controller;

import com.example.demo.UploadFile.AnhKH;
import com.example.demo.dto.AnhDTO;
import com.example.demo.dto.KhachHangDTO;
import com.example.demo.entity.*;
import com.example.demo.service.impl.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hoa-don/")
public class HoaDonController {
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
    private NhanVienServiceImpl nvService;

    @GetMapping("hien-thi")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(serviceHD.listHD());
    }

    @GetMapping("hien-thi-doi-hang/{id}")
    public ResponseEntity<?> getAll2(@PathVariable UUID id) {
        return ResponseEntity.ok(serviceHD.listDoiHang(id));
    }

    @GetMapping("hien-thi-don-yeu-cau-doi/{id}")
    public ResponseEntity<?> getAll3(@PathVariable UUID id) {
        return ResponseEntity.ok(serviceHD.YCDoiHang(id));
    }

    @GetMapping("hien-thi-sp-yeu-cau-doi/{id}")
    public ResponseEntity<?> getAllHangYCDoiById(@PathVariable UUID id) {
        return ResponseEntity.ok(serviceHD.listYCDoiHang(id));
    }


    @GetMapping("hien-thi-san-pham")
    public ResponseEntity<?> getAllSP() {
        return ResponseEntity.ok(serviceHD.getAllSP());
    }

    @GetMapping("/searchSP")
    public ResponseEntity<?> search(@RequestParam(value = "key", required = false) String key) {
        return ResponseEntity.ok(serviceHD.searchSPofHDCT(key));
    }

    @GetMapping("getById/{id}")
    public ResponseEntity<?> getAllById(@PathVariable UUID id) {
        return ResponseEntity.ok(hoaDonChiTietService.getAll(id));
    }

    @GetMapping("getKmById/{id}")
    public ResponseEntity<?> getKmById(@PathVariable UUID id) {
        return ResponseEntity.ok(hoaDon_khuyenMaiService.getAll(id));
    }

    @PostMapping("addKM")
    public ResponseEntity<?> add(@RequestBody HoaDon_KhuyenMai hoaDon) {
        List<HoaDon_KhuyenMai> list = hoaDon_khuyenMaiService.getAllNotById();
        for (HoaDon_KhuyenMai h : list) {
            if (hoaDon.getHoaDon().getId().equals(h.getHoaDon().getId())
                    && hoaDon.getKhuyenMai().getId().equals(h.getKhuyenMai().getId())) {
                return ResponseEntity.ok("Mày thích spam không ?");
            }
        }
        return ResponseEntity.ok(hoaDon_khuyenMaiService.add(hoaDon));
    }

    @GetMapping("/getAllKCByIdMSAndIdSP/{idMS}/{idSP}")
    public ResponseEntity<List<String>> getKCByIdMSAndIdSP(@PathVariable UUID idMS, @PathVariable UUID idSP) {
        List<String> listKC = chiTietSanPhamService.getKCByIdMSAndIdSP(idMS, idSP);
        return ResponseEntity.ok(listKC);
    }

    @GetMapping("/findAllAnhByIdMSAndIdSP/{idMS}/{idSP}")
    public ResponseEntity<List<AnhDTO>> findAnhByIdMSAndIdSP(@PathVariable UUID idMS, @PathVariable UUID idSP) {
        List<Anh> listAnh = chiTietSanPhamService.findAnhByIdMSAndIdSP(idMS, idSP);
        if (listAnh.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<AnhDTO> imageDTOList = listAnh.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(imageDTOList);
    }

    private AnhDTO convertToDTO(Anh anh) {
        AnhDTO anhDTO = new AnhDTO();
        anhDTO.setId(anh.getId());
        anhDTO.setMa(anh.getMa());
        anhDTO.setTrangThai(anh.getTrangThai());
        anhDTO.setNgayTao(anh.getNgayTao());
        anhDTO.setNgaySua(anh.getNgaySua());
        anhDTO.setChiTietSanPhamTen(anh.getChiTietSanPham().getSanPham().getTen());

        if (anh.getTen() != null) {
            try {
                Blob blob = anh.getTen();
                byte[] tenBytes = blob.getBytes(1, (int) blob.length());
                String tenBase64 = Base64.getEncoder().encodeToString(tenBytes);
                anhDTO.setTenBase64(tenBase64);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            anhDTO.setTenBase64(null);
        }

        return anhDTO;
    }

    @GetMapping("getAllMSByIdSP/{id}")
    public ResponseEntity<?> getAllByIdSP2(@PathVariable UUID id) {
        return ResponseEntity.ok(chiTietSanPhamService.getAllMSByIdSP(id));
    }

    @GetMapping("searchByTrangThai/{id}")
    public ResponseEntity<?> searchByTrangThai(@PathVariable UUID id, @RequestParam Integer[] trangThai) {
        Map<String, Object> map = new HashMap<>();
        List<HoaDon> list = serviceHD.searchByTrangThai(trangThai, id);

        // Tạo danh sách chứa thông tin hóa đơn và hóa đơn chi tiết
        List<Map<String, Object>> hoaDonList = new ArrayList<>();

        // Tạo một Set để theo dõi các hóa đơn đã được xử lý
        Set<UUID> processedHoaDonIds = new HashSet<>();

        for (HoaDon hd : list) {
            // Kiểm tra xem hóa đơn đã được xử lý chưa
            if (!processedHoaDonIds.contains(hd.getId())) {
                Map<String, Object> hoaDonData = new HashMap<>();

                // Lấy thông tin hóa đơn
                hoaDonData.put("hoaDon", hd);

                // Lấy danh sách hóa đơn chi tiết tương ứng với hóa đơn
                List<HoaDonChiTiet> listHCDCT = hoaDonChiTietService.getAll(hd.getId());
                hoaDonData.put("hoaDonChiTiet", listHCDCT);

                hoaDonList.add(hoaDonData);

                // Đánh dấu hóa đơn đã được xử lý
                processedHoaDonIds.add(hd.getId());
            }
        }

        map.put("hoaDonList", hoaDonList);
        return ResponseEntity.ok(map);
    }


    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody HoaDon hoaDon, @RequestParam String nguoiTao) {
        String ma = "HD" + new Random().nextInt(100000);
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        hoaDon.setMa(ma);
        hoaDon.setNgayTao(new Date());
        hoaDon.setLoaiDon(0);
        hoaDon.setTenNguoiNhan("Khách lẻ");
        hoaDon.setNhanVien(nvService.getOne(hoaDon.getNhanVien().getId()));
        hoaDon.setTienShip(0.0);
        hoaDon.setTrangThai(0);
        HinhThucThanhToan httt = new HinhThucThanhToan().builder()
                .ma(ma)
                .ten("Tiền mặt")
                .ngayTao(new Date())
                .tien(0.0)
                .trangThai(0)
                .build();
        httt = serviceHttt.add(httt);
        hoaDon.setHinhThucThanhToan(httt);
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon().builder()
                .ma(maLSHD)
                .ten("Tạo hoá đơn")
                .trangThai(0)
                .nguoiTao(nguoiTao)
                .ngayTao(new Date())
                .hoaDon(hoaDon)
                .ghiChu("Tạo hoá đơn")
                .build();
        serviceHD.add(hoaDon);
        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PutMapping("update-hd/{id}")
    public ResponseEntity<?> updateHD(@PathVariable UUID id, @RequestBody HoaDon hoaDon) {
        String ma = "HTTT" + new Random().nextInt(100000);
        HoaDon hd = serviceHD.detailHD(id);
        HinhThucThanhToan h = serviceHttt.detail(hd.hinhThucThanhToan.getId());
        HinhThucThanhToan httt = new HinhThucThanhToan().builder()
                .id(hd.hinhThucThanhToan.getId())
                .ma(ma)
                .ten(hoaDon.getHinhThucThanhToan().getTen())
                .ngayTao(h.getNgayTao())
                .ngaySua(new Date())
                .trangThai(hoaDon.getHinhThucThanhToan().getTrangThai())
                .tien(hoaDon.getHinhThucThanhToan().getTien())
                .build();
        hoaDon.setId(id);
        hoaDon.setNgayTao(hd.getNgayTao());
        if (hoaDon.getTongTienKhiGiam().doubleValue() <= 0) {
            hoaDon.setTongTienKhiGiam(0.0);
        }
        hoaDon.setNgayThanhToan(new Date());
        hoaDon.setTienShip(0.0);
        hoaDon.setNgaySua(new Date());
        hoaDon.setMa(hd.getMa());
        hoaDon.setLoaiDon(0);
        if (hoaDon.getTenNguoiNhan().isEmpty()) {
            hoaDon.setTenNguoiNhan("Khách vãng lai");
        }
        hoaDon.setTenNguoiNhan(hoaDon.getTenNguoiNhan());
        hoaDon.setSoDienThoai(hoaDon.getSoDienThoai());
        if (hoaDon.getTrangThai() != 4) {
            hoaDon.setTrangThai(0);
        }
        httt = serviceHttt.add(httt);
        hoaDon.setHinhThucThanhToan(httt);
        return ResponseEntity.ok(serviceHD.add(hoaDon));
    }


    @PutMapping("/thanh-toan/{id}")
    public ResponseEntity<?> thanhToan(@PathVariable UUID id, @RequestParam String nguoiTao) {
        HoaDon hd = serviceHD.detailHD(id);
        String maLS = "LSHD" + new Random().nextInt(100000);
        LichSuHoaDon ls = serviceLSHD.detail(hd.getId()).builder()
                .trangThai(4)
                .ma(maLS)
                .ten("Đã hoàn thành")
                .ngayTao(new Date())
                .nguoiTao(nguoiTao)
                .hoaDon(hd)
                .ghiChu("Đã thanh toán")
                .build();
        hd.setTrangThai(4);
        serviceHD.add(hd);
        return ResponseEntity.ok(serviceLSHD.add(ls));
    }

    @PostMapping("add-sp")
    public ResponseEntity<?> addSP(@RequestBody HoaDonChiTiet hoaDon) {
        List<HoaDonChiTiet> list = hoaDonChiTietService.findAll();
        for (HoaDonChiTiet h : list) {
            if (h.getChiTietSanPham().getId().equals(hoaDon.getChiTietSanPham().getId()) &&
                    h.getHoaDon().getId().equals(hoaDon.getHoaDon().getId())) {
                // Không tìm thấy cặp id hoá đơn và id sản phẩm trong cơ sở dữ liệu, thực hiện thêm mới
                ChiTietSanPham sp = chiTietSanPhamService.detail(hoaDon.getChiTietSanPham().getId());
                hoaDon.setDonGia(sp.getGiaBan());
                // Tìm thấy cặp id hoá đơn và id sản phẩm trong cơ sở dữ liệu
                hoaDonChiTietService.update(hoaDon.getSoLuong(), h.getId());
                chiTietSanPhamService.update(sp.getSoLuong() - hoaDon.getSoLuong(), hoaDon.getChiTietSanPham().getId());
                return ResponseEntity.ok("ok");
            }
        }

        // Không tìm thấy cặp id hoá đơn và id sản phẩm trong cơ sở dữ liệu, thực hiện thêm mới
        ChiTietSanPham sp = chiTietSanPhamService.detail(hoaDon.getChiTietSanPham().getId());
        hoaDon.setDonGia(sp.getGiaBan());
        hoaDonChiTietService.add(hoaDon);
        chiTietSanPhamService.update(sp.getSoLuong() - hoaDon.getSoLuong(), hoaDon.getChiTietSanPham().getId());
        return ResponseEntity.ok(hoaDon.getId());
    }

    @PutMapping("update-sl/{id}")
    public ResponseEntity<?> updateSL(@PathVariable UUID id, @RequestBody HoaDonChiTiet hoaDon) {
        HoaDonChiTiet hd = hoaDonChiTietService.findById(id);
        ChiTietSanPham sp = chiTietSanPhamService.detail(hoaDon.getChiTietSanPham().getId());
        if (hoaDon.getSoLuong() > hd.getSoLuong()) {
            chiTietSanPhamService.update(sp.getSoLuong() - (hoaDon.getSoLuong() - hd.getSoLuong()), hoaDon.getChiTietSanPham().getId());
            hoaDonChiTietService.updateSL(hoaDon.getSoLuong(), hd.getId());
            return ResponseEntity.ok("Tang cthd, giam ctsp");
        } else {
            // Không tìm thấy cặp id hoá đơn và id sản phẩm trong cơ sở dữ liệu, thực hiện thêm mới
            chiTietSanPhamService.update(sp.getSoLuong() + (hd.getSoLuong() - hoaDon.getSoLuong()), hoaDon.getChiTietSanPham().getId());
            hoaDonChiTietService.updateSL(hoaDon.getSoLuong(), hd.getId());
            return ResponseEntity.ok("Giam cthd, tang ctsp");
        }
    }

    @PutMapping("update-sl-hang-doi/{id}")
    public ResponseEntity<?> updateSLHDoi(@PathVariable UUID id, @RequestBody HoaDonChiTiet hoaDonCT) {
        HoaDonChiTiet hdct = hoaDonChiTietService.findById(id);
        ChiTietSanPham sp = chiTietSanPhamService.detail(hdct.getChiTietSanPham().getId());

            hoaDonChiTietService.updateSLDH(hoaDonCT.getSoLuongHangDoi(), hdct
                    .getId());

            chiTietSanPhamService.update(sp.getSoLuong() + (hoaDonCT.getSoLuongHangDoi() - hdct.getSoLuongHangDoi()),
                hdct.getChiTietSanPham().getId());
            return ResponseEntity.ok("ok");
    }


    @DeleteMapping("delete-hdct/{id}")
    public ResponseEntity<?> deleteHDCT(@PathVariable UUID id) {
        HoaDonChiTiet hd = hoaDonChiTietService.findById(id);
        ChiTietSanPham sp = chiTietSanPhamService.detail(hd.getChiTietSanPham().getId());
        chiTietSanPhamService.update(sp.getSoLuong() + hd.getSoLuong(), sp.getId());
        hoaDonChiTietService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("hien-thi-page")
    public ResponseEntity<?> getPageHD(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 10);
        return ResponseEntity.ok(serviceHD.hienThiPageHD(pageable));
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        return ResponseEntity.ok(serviceHD.detailHD(id));
    }

    @GetMapping("hien-thi-list-lshd/{id}")
    public ResponseEntity<?> listLSHDByIds(@PathVariable UUID id) {
        return ResponseEntity.ok(serviceLSHD.findAllLSHDByIDsHD(id));
    }

    @GetMapping("hien-thi-page-find")
    public ResponseEntity<?> findVIP(String key, String tuNgay, String denNgay, Integer trangThai,
                                     Integer loaiDon, Double minSL, Double maxSL, Double minTT,
                                     Double maxTT,
                                     @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 10);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date tuNgayDate = null;
        Date denNgayDate = null;

        try {
            tuNgayDate = dateFormat.parse(tuNgay);
            denNgayDate = dateFormat.parse(denNgay);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(serviceHD.searchVIP(key, tuNgayDate, denNgayDate, trangThai, loaiDon, minSL, maxSL, minTT, maxTT, pageable));
    }

    @PutMapping("updateHD/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody HoaDon hoaDon) {
        serviceHD.updateHD(id, hoaDon.getTenNguoiNhan(), hoaDon.getSoDienThoai(),
                hoaDon.getDiaChi(), hoaDon.getTinh(), hoaDon.getHuyen(), hoaDon.getXa(),
                hoaDon.getTongTien(), hoaDon.getTongTienKhiGiam(), hoaDon.getTienShip());
        return ResponseEntity.ok().body("ok");
    }

    @PostMapping("xac-nhan/{id}")
    public ResponseEntity<?> xacNhan(@PathVariable UUID id,
                                     @RequestBody LichSuHoaDon lichSuHoaDon,
                                     @RequestParam String nguoiTao) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(1);
        hoaDon.setTrangThai(1);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Chờ vận chuyển");

        List<LichSuHoaDon> danhSachLichSuHoaDon = serviceLSHD.findAllLSHDByIDsHD(id);

        for (LichSuHoaDon lichSu : danhSachLichSuHoaDon) {
            String nguoiTaoValue = lichSu.getNguoiTao(); // Lấy giá trị nguoiTao từ LichSuHoaDon
            if (nguoiTaoValue == null || nguoiTaoValue.isEmpty()) {
                lichSu.setNguoiTao(nguoiTao);
                lichSuHoaDon.setNguoiTao(nguoiTao);
            }
        }

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PostMapping("request-huy-don/{id}")
    public ResponseEntity<?> requestHuyDon(@PathVariable UUID id,
                                           @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(14);
        hoaDon.setTrangThai(14);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Yêu cầu huỷ đơn");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PostMapping("huy-don/{id}")
    public ResponseEntity<?> huyDon(@PathVariable UUID id,
                                    @RequestBody LichSuHoaDon lichSuHoaDon,
                                    @RequestParam String nguoiTao) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(2);
        hoaDon.setTrangThai(2);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Đã hủy");
        List<LichSuHoaDon> danhSachLichSuHoaDon = serviceLSHD.findAllLSHDByIDsHD(id);

        for (LichSuHoaDon lichSu : danhSachLichSuHoaDon) {
            String nguoiTaoValue = lichSu.getNguoiTao(); // Lấy giá trị nguoiTao từ LichSuHoaDon
            if (nguoiTaoValue == null || nguoiTaoValue.isEmpty()) {
                lichSu.setNguoiTao(nguoiTao);
                lichSuHoaDon.setNguoiTao(nguoiTao);
            }
        }

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PostMapping("xac-nhan-giao-hang/{id}")
    public ResponseEntity<?> xacNhanGiao(@PathVariable UUID id,
                                         @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(3);
        hoaDon.setTrangThai(3);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Đang giao");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PostMapping("giao-hang-thanh-cong/{id}")
    public ResponseEntity<?> giaoHangThanhCong(@PathVariable UUID id,
                                               @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(4);
        hoaDon.setTrangThai(4);
        hoaDon.setNgayThanhToan(new Date());
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Đã hoàn thành");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PostMapping("giao-hang-that-bai/{id}")
    public ResponseEntity<?> giaoHangThatBai(@PathVariable UUID id,
                                             @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        if (hoaDon == null) {

        }
        lichSuHoaDon.setTrangThai(5);
        hoaDon.setTrangThai(5);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Giao hàng thất bại");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @GetMapping("/getAll")
    public ResponseEntity<byte[]> getAllKH() throws IOException {
        List<KhachHang> listKH = khService.getAllKH();

        // Convert the Page<KhachHang> to byte array
        byte[] khachHangBytes = convertPageToByteArray2(listKH);

        // Set the content type as application/octet-stream
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "khachhang.json");

        return ResponseEntity.ok()
                .headers(headers)
                .body(khachHangBytes);
    }

    private byte[] convertPageToByteArray2(List<KhachHang> khachHangPage) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ByteArrayInputStream.class, new AnhKH());
        objectMapper.registerModule(module);
        byte[] khachHangBytes = objectMapper.writeValueAsBytes(khachHangPage);
        return khachHangBytes;
    }

    @GetMapping("/searchKHinBH")
    public ResponseEntity<byte[]> searchKhinBH(String key) throws IOException {
        List<KhachHang> listKH = khService.searchKHinBH(key);

        // Convert the Page<KhachHang> to byte array
        byte[] khachHangBytes = convertPageToByteArray2(listKH);

        // Set the content type as application/octet-stream
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "khachhang.json");

        return ResponseEntity.ok()
                .headers(headers)
                .body(khachHangBytes);
    }


    @PostMapping("/addKHinBH/{id}")
    public ResponseEntity<?> addKHinBH(@PathVariable UUID id, @RequestBody KhachHang kh, MultipartFile anh) throws IOException, SQLException {
        // Create a new KhachHang object
        if (kh.getMaKhachHang() == null) {
            String ma = "KH" + new Random().nextInt(100000);
            kh.setMaKhachHang(ma);
        }
        kh.setTrangThai(1);
        HoaDon hd = serviceHD.detailHD(id);
        hd.setSoDienThoai(kh.getSdt());
        hd.setTenNguoiNhan(kh.getTenKhachHang());
        serviceHD.add(hd);
        KhachHang savedKhachHang = khService.add(kh);
        KhachHangDTO savedKhachHangDTO = convertToDto(savedKhachHang);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHangDTO);
    }

    private KhachHangDTO convertToDto(KhachHang khachHang) {
        KhachHangDTO khachHangDTO = KhachHangDTO.builder()
                .id(khachHang.getId())
                .maKhachHang(khachHang.getMaKhachHang())
                .tenKhachHang(khachHang.getTenKhachHang())
                .sdt(khachHang.getSdt())
                .email(khachHang.getEmail())
                .ngaySinh(khachHang.getNgaySinh())
                .matKhau(khachHang.getMatKhau())
                .trangThai(khachHang.getTrangThai())
                .build();

        return khachHangDTO;
    }
}




