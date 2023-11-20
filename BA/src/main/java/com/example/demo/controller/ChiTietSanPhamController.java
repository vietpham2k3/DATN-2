package com.example.demo.controller;

import com.example.demo.dto.AnhDTO;
import com.example.demo.dto.FilterProductClient;
import com.example.demo.entity.Anh;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.SanPham;
import com.example.demo.service.impl.AnhServiceImpl;
import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import com.example.demo.service.impl.SanPhamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/chi-tiet-san-pham/")
@CrossOrigin(origins = "http://localhost:3000")
public class ChiTietSanPhamController {

    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;

    @Autowired
    private SanPhamServiceImpl sanPhamRepository;

    private Date date = new Date();

    @Autowired
    private AnhServiceImpl anhService;

    @GetMapping("getAll")
    public ResponseEntity<?> hienThiPage(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok(chiTietSanPhamService.page(page));
    }

    @PutMapping("update-sl-sp/{id}")
    public ResponseEntity<?> updateSl(@PathVariable UUID id, @RequestParam("soLuong") Integer soLuong) {
        chiTietSanPhamService.update(soLuong, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("getAllCTSP")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(chiTietSanPhamService.getAll());
    }

    @GetMapping("getAllByIdSP/{id}")
    public ResponseEntity<?> getAllByIdSP(@PathVariable UUID id) {
        return ResponseEntity.ok(chiTietSanPhamService.getAllByIdSP(id));
    }

    @GetMapping("getAllByIdSPTT/{id}")
    public ResponseEntity<?> getAllByIdSPTT(@PathVariable UUID id) {
        return ResponseEntity.ok(chiTietSanPhamService.getAllByIdSPTT(id));
    }

    @GetMapping("getAllSPNEW")
    public ResponseEntity<?> getAllSPNEW() {
        return ResponseEntity.ok(chiTietSanPhamService.getAllSPNEW());
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") UUID id) throws IOException, SQLException {
        Anh image = anhService.viewById(id);
        byte[] imageData = convertBlobToBytes(image.getTen());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageData);
    }

    @GetMapping("getAllWeb")
    public ResponseEntity<?> hienThiPageWeb(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok(chiTietSanPhamService.pageWeb(page));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(chiTietSanPhamService.detail(id));
    }

    private byte[] convertBlobToBytes(Blob blob) throws IOException, SQLException {
        try (InputStream inputStream = blob.getBinaryStream()) {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
            return outputStream.toByteArray();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ChiTietSanPham chiTietSanPham) throws IOException {
        String ma = "CTSP" + new Random().nextInt(100000);
        String maSP = "SP" + new Random().nextInt(100000);

        chiTietSanPham.setNgayTao(date);
        chiTietSanPham.setMa(ma);

        SanPham sanPham = new SanPham().builder()
                .id(chiTietSanPham.getSanPham().getId())
                .ma(maSP)
                .ten(chiTietSanPham.getSanPham().getTen())
                .moTa(chiTietSanPham.getSanPham().getMoTa())
                .ngayTao(date)
                .trangThai(1)
                .build();
        List<ChiTietSanPham> sp = chiTietSanPhamService.detailByIdSP(chiTietSanPham.getSanPham().getId());
        for (ChiTietSanPham ctsp : sp) {
            if (chiTietSanPham.getMauSac().getId().equals(ctsp.getMauSac().getId())
                    && chiTietSanPham.getKichCo().getId().equals(ctsp.getKichCo().getId())) {
                chiTietSanPhamService.update(chiTietSanPham.getSoLuong()+ ctsp.getSoLuong(), ctsp.getId());
                return ResponseEntity.ok("da ton tai");
            }
        }

        // Lưu sanPham vào cơ sở dữ liệu trước
        sanPham = sanPhamRepository.add(sanPham);

        chiTietSanPham.setSanPham(sanPham);
        return ResponseEntity.ok(chiTietSanPhamService.add(chiTietSanPham));
    }

    @GetMapping("getAllBestseller")
    public ResponseEntity<?> getAllBestseller() {
        return ResponseEntity.ok(chiTietSanPhamService.getAllBestseller());
    }

    @GetMapping("getAllProduct")
    public ResponseEntity<?> getAllProduct() {
        return ResponseEntity.ok(chiTietSanPhamService.getAllProduct());
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImages(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("id") UUID id
    ) {
        if (files.length == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Vui lòng chọn ít nhất một tệp ảnh.");
        }
        int maxImages = 5; // Đặt số lượng tối đa là 5 hoặc bất kỳ con số nào bạn muốn

        if (files.length > maxImages) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bạn chỉ được tải lên tối đa " + maxImages + " ảnh.");
        }
        ChiTietSanPham ctsp = chiTietSanPhamService.detail(id);

        try {
            List<Anh> addedImages = new ArrayList<>();

            for (MultipartFile file : files) {
                if (file.isEmpty()) {
                    continue;
                }

                String ma = "IMG" + new Random().nextInt(100000);

                Anh anh = new Anh();
                anh.setId(UUID.randomUUID());
                anh.setMa(ma);
                anh.setChiTietSanPham(ctsp);
                Blob imageBlob = createBlob(file.getBytes());
                anh.setTen(imageBlob);
                anh.setTrangThai(1);
                anh.setNgayTao(date);
                anhService.add(anh);

                addedImages.add(anh);
            }

            return ResponseEntity.ok("Tải lên ảnh thành công.");
        } catch (IOException | SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi trong quá trình tải lên ảnh.");
        }
    }

    private Blob createBlob(byte[] bytes) throws SQLException {
        return new javax.sql.rowset.serial.SerialBlob(bytes);
    }

    @GetMapping("/view-all-image/{id}")
    public ResponseEntity<List<AnhDTO>> getImageListByChiTietSanPhamId(@PathVariable("id") UUID chiTietSanPhamId) {
        List<Anh> imageList = anhService.getAllByChiTietSanPhamId(chiTietSanPhamId);

        if (imageList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<AnhDTO> imageDTOList = imageList.stream()
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

    @DeleteMapping("/delete-img/{id}")
    public ResponseEntity<?> deleteImg(@PathVariable UUID id) {
        anhService.delete(id);
        return ResponseEntity.ok("OK");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody ChiTietSanPham chiTietSanPham) {
        ChiTietSanPham sp = chiTietSanPhamService.detail(id);
        SanPham spct = sanPhamRepository.detail(chiTietSanPham.getSanPham().getId());

        SanPham sanPham = new SanPham().builder()
                .id(spct.getId())
                .ma(spct.getMa())
                .ten(chiTietSanPham.getSanPham().getTen())
                .moTa(chiTietSanPham.getSanPham().getMoTa())
                .ngayTao(spct.getNgayTao())
                .ngaySua(date)
                .trangThai(1)
                .build();

        // Lưu sanPham vào cơ sở dữ liệu trước
        sanPham = sanPhamRepository.add(sanPham);

        chiTietSanPham.setId(id);
        chiTietSanPham.setMa(sp.getMa());
        chiTietSanPham.setNgayTao(sp.getNgayTao());
        chiTietSanPham.setNgaySua(date);
        chiTietSanPham.setSanPham(sanPham);
        return ResponseEntity.ok(chiTietSanPhamService.add(chiTietSanPham));
    }

    @PutMapping("/update-tt/{id}")
    public ResponseEntity<?> updatett(@PathVariable UUID id) {
        chiTietSanPhamService.delete(id);
        return ResponseEntity.ok("Thành công");
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(
            @RequestParam(value = "key", required = false) String key,
            @RequestParam(value = "trangThai", required = false) Integer trangThai,
            @RequestParam(value = "min", required = false) Double min,
            @RequestParam(value = "max", required = false) Double max,
            @RequestParam(value = "mauSac", required = false) List<String> mauSac,
            @RequestParam(value = "chatLieu", required = false) List<String> chatLieu,
            @RequestParam(value = "loaiSanPham", required = false) List<String> loaiSanPham,
            @RequestParam(value = "nhaSanXuat", required = false) List<String> nhaSanXuat,
            @RequestParam(value = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok(chiTietSanPhamService.search(key, trangThai, min, max, mauSac, chatLieu, loaiSanPham, nhaSanXuat, page));
    }


    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        chiTietSanPhamService.delete(id);
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/deleteMSKC/{id}")
    public ResponseEntity<?> deleteMSKC(@PathVariable UUID id) {
        chiTietSanPhamService.deleteMSKC(id);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/searchMT")
    public ResponseEntity<?> searchMaAndTen(
            @RequestParam(value = "key", required = false) String key,
            @RequestParam(value = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok(chiTietSanPhamService.searchMaAndTen(key, page));
    }

    @PostMapping("/filter")
    public ResponseEntity<?> filter(@RequestBody FilterProductClient filterProductClient, @RequestParam(value = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.status(HttpStatus.OK).body(chiTietSanPhamService.filter(filterProductClient, page));
    }

}
