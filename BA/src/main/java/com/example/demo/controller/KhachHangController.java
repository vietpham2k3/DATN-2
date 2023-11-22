package com.example.demo.controller;

import com.example.demo.UploadFile.AnhKH;
import com.example.demo.dto.DoiMatKhau;
import com.example.demo.dto.KhachHangDTO;
import com.example.demo.dto.KhachHangInfo;
import com.example.demo.entity.KhachHang;
import com.example.demo.service.impl.HoaDonServiceImpl;
import com.example.demo.service.impl.KhachHangServiceImpl;
import com.example.demo.service.impl.SendEmailServicecImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/api/khach-hang")
@CrossOrigin(origins = "http://localhost:3000")
public class KhachHangController {

    @Autowired
    public HoaDonServiceImpl serviceHD;

    @Autowired
    private KhachHangServiceImpl khService;

    @Autowired
    private SendEmailServicecImpl emailService;



    @GetMapping("/getAll/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") UUID id) throws IOException, SQLException {
        KhachHang kh = khService.getOne(id);
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/getAllKH/{id}")
    public ResponseEntity<?> getAllKH(@PathVariable("id") UUID id){
        return ResponseEntity.ok(khService.getOne(id));
    }

    @GetMapping("/getAllPage")
    public ResponseEntity<byte[]> getAll(@RequestParam(defaultValue = "0") Integer page) throws IOException {
        Page<KhachHang> khachHangPage = khService.getAll(page);

        // Convert the Page<KhachHang> to byte array
        byte[] khachHangBytes = convertPageToByteArray(khachHangPage);

        // Set the content type as application/octet-stream
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "khachhang.json");

        return ResponseEntity.ok()
                .headers(headers)
                .body(khachHangBytes);
    }

    /**
     * Convert the Page<KhachHang> to byte array.
     */
    private byte[] convertPageToByteArray(Page<KhachHang> khachHangPage) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ByteArrayInputStream.class, new AnhKH());
        objectMapper.registerModule(module);
        byte[] khachHangBytes = objectMapper.writeValueAsBytes(khachHangPage);
        return khachHangBytes;
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        KhachHang khachHang = khService.getOne(id);
        if (khachHang == null) {
            return ResponseEntity.notFound().build();
        }

        KhachHangDTO khachHangDTO = new KhachHangDTO();
        khachHangDTO.setId(khachHang.getId());
        khachHangDTO.setMaKhachHang(khachHang.getMaKhachHang());
        khachHangDTO.setTenKhachHang(khachHang.getTenKhachHang());
        khachHangDTO.setSdt(khachHang.getSdt());
        khachHangDTO.setEmail(khachHang.getEmail());
        khachHangDTO.setNgaySinh(khachHang.getNgaySinh());
        khachHangDTO.setMatKhau(khachHang.getMatKhau());
        khachHangDTO.setGioiTinh(khachHang.getGioiTinh());
        khachHangDTO.setTrangThai(khachHang.getTrangThai());

        return ResponseEntity.ok(khachHangDTO);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestParam(value = "anh", required = false) MultipartFile anh,
                                 @RequestParam("tenKhachHang") String tenKhachHang,
                                 @RequestParam("sdt") String sdt,
                                 @RequestParam("email") String email,
                                 @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngaySinh,
                                 @RequestParam("gioiTinh") Boolean gioiTinh,
                                 @RequestParam("tinhThanh") String tinhThanh,
                                 @RequestParam("quanHuyen") String quanHuyen,
                                 @RequestParam("phuongXa") String phuongXa,
                                 @RequestParam("diaChi") String diaChi,
                                 @RequestParam("trangThai") Integer trangThai
    ) throws IOException, SQLException {
        // Create a new KhachHang object
        KhachHang khachHang = new KhachHang();
        String ma = "KH" + new Random().nextInt(100000);
        khachHang.setMaKhachHang(ma);
        khachHang.setTenKhachHang(tenKhachHang);
        khachHang.setSdt(sdt);
        khachHang.setEmail(email);
        khachHang.setNgaySinh(ngaySinh);
        khachHang.setGioiTinh(gioiTinh);
        khachHang.setTrangThai(trangThai);

        //send email
        String matKhauMoi = generateRandomPassword(8);

        khachHang = khService.add(khachHang);
        KhachHangDTO savedKhachHangDTO = convertToDto(khachHang);


        // Gửi email chứa mật khẩu mới
        String subject = "Thông tin tài khoản";
        String body = "<h2>Thông tin tài khoản của bạn</h2>"
                + "<p>Xin chào, " + tenKhachHang + "</p>"
                + "<p>Chúng tôi gửi thông tin truy cập hệ thông của bạn:</p>"
                + "<p>Tên đăng nhập: " + email + "</p>"
                + "<p>Mật khẩu truy cập tạm thời là: <strong>" + matKhauMoi + "</strong></p>"
                + "<p>Lưu ý: Đây là mật khẩu mặc định được tạo bởi hệ thống, bạn vui lòng đổi lại để đảm bảo an toàn thông tin</p>"
                + "<p>Đây là email tự động vui lòng không trả lời.</p>";
        emailService.sendEmail(email, subject, body);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHangDTO);
    }

    private String generateRandomPassword(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * characters.length());
            password.append(characters.charAt(index));
        }

        return password.toString();
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id,
                                    @RequestParam(value = "anh", required = false) MultipartFile anh) throws IOException, SQLException {
        KhachHang khachHang = new KhachHang();


        // Save the KhachHang object
        KhachHang savedKhachHang = khService.delete(id);
        KhachHangDTO savedKhachHangDTO = convertToDto(savedKhachHang);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHangDTO);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestParam(value = "anh", required = false) MultipartFile anh,
//                                    @RequestParam("maKhachHang") String maKhachHang,
                                    @RequestParam("tenKhachHang") String tenKhachHang,
                                    @RequestParam("sdt") String sdt,
                                    @RequestParam("email") String email,
                                    @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngaySinh,
                                    @RequestParam("gioiTinh") Boolean gioiTinh,
                                    @RequestParam("trangThai") Integer trangThai) throws IOException, SQLException {
        // Create a new KhachHang object
        KhachHang khachHang = khService.getOne(id);

        khachHang.setTenKhachHang(tenKhachHang);
        khachHang.setSdt(sdt);
        khachHang.setEmail(email);
        khachHang.setNgaySinh(ngaySinh);
        khachHang.setGioiTinh(gioiTinh);
        khachHang.setTrangThai(trangThai);

        // Save the KhachHang object
        KhachHang savedKhachHang = khService.update(khachHang, id);
        KhachHangDTO savedKhachHangDTO = convertToDto(savedKhachHang);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHangDTO);
    }


    @GetMapping("/searchKH")
    public ResponseEntity<?> getAll(@RequestParam(value = "key", required = false) String key,
                                    @RequestParam(value = "trangThai", required = false) Integer trangThai,
                                    @RequestParam(value = "gioiTinh", required = false) Boolean gioiTinh,
                                    @RequestParam(defaultValue = "0") Integer page) throws IOException {
        Pageable pageable = PageRequest.of(page, 5);
        Page<KhachHang> khachHangPage = khService.searchKH(key, trangThai, gioiTinh, pageable);
        // Convert the Page<KhachHang> to byte array
        byte[] khachHangBytes = convertPageToByteArray(khachHangPage);
//
//        // Set the content type as application/octet-stream
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "khachhang.json");
//
        return ResponseEntity.ok()
                .headers(headers)
                .body(khachHangBytes);
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
                .gioiTinh(khachHang.getGioiTinh())
//                .diaChi(DiaChi.builder().id(khachHang.getId()).build())
                .build();


        return khachHangDTO;
    }

    private KhachHangInfo convertToinfo(KhachHang khachHang) {
        KhachHangInfo khachHangInfo = KhachHangInfo.builder()
                .tenKhachHang(khachHang.getTenKhachHang())
                .email(khachHang.getEmail())
                .gioiTinh(khachHang.getGioiTinh())
                .ngaySinh(khachHang.getNgaySinh())
                .build();

        return khachHangInfo;
    }

    @PutMapping("/updateinfo/{id}")
    public ResponseEntity<?> updateinfo(@PathVariable UUID id, @RequestBody KhachHang khachHang
    ) {
        khachHang.setId(id);
        KhachHang savedKhachHang = khService.updateKhinfo(khachHang, id);
        KhachHangInfo savedKhachHanginfo = convertToinfo(savedKhachHang);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHanginfo);
    }



    @PutMapping("/change-password/{id}")
    public String changePassword(
            @PathVariable UUID id,
            @RequestBody DoiMatKhau changePasswordRequest
    ) {
        KhachHang user = khService.getOne(id);

        if (user == null) {
            return "User not found";
        }

        // Thực hiện xác thực mật khẩu hiện tại ở đây
        if (!user.getMatKhau().equals(changePasswordRequest.getCurrentPassword())) {
            return "Incorrect current password";
        }

        // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới
        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
            return "New password and confirm password do not match";
        }

        // Thực hiện thay đổi mật khẩu
        user.setMatKhau(changePasswordRequest.getNewPassword());
        khService.changePassword(user);

        return "Password changed successfully";
    }
    @PostMapping("/check-current-password")
    public ResponseEntity<String> checkCurrentPassword(@RequestBody DoiMatKhau request) {
        UUID userId = request.getId();
        String currentPassword = request.getCurrentPassword();

        // Kiểm tra tính hợp lệ của mật khẩu hiện tại
        boolean isCurrentPasswordValid = khService.isCurrentPasswordValid(userId, currentPassword);

        if (isCurrentPasswordValid) {
            // Mật khẩu hiện tại hợp lệ
            return ResponseEntity.ok("Mật khẩu hiện tại hợp lệ.");
        } else {
            // Mật khẩu hiện tại không hợp lệ
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu hiện tại không hợp lệ.");
        }
    }
}
