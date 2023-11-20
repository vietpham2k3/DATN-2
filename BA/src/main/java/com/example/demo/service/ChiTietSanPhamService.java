package com.example.demo.service;

import com.example.demo.dto.FilterProductClient;
import com.example.demo.entity.Anh;
import com.example.demo.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ChiTietSanPhamService {
    List<ChiTietSanPham> getAll();

    List<ChiTietSanPham> getAllByIdSP(UUID id);

    List<ChiTietSanPham> getAllByIdSPTT(UUID id);

    List<String> getAllMSByIdSP(UUID id);

    List<ChiTietSanPham> updateAll(List<ChiTietSanPham> chiTietSanPham);

    List<String> getKCByIdMSAndIdSP(UUID idMS, UUID idSP);

    List<Anh> findAnhByIdMSAndIdSP(UUID idSP, UUID idMS);

    List<ChiTietSanPham> getAllSPNEW();

    Page<ChiTietSanPham> page(Integer page);


    Page<ChiTietSanPham> search(
            String key,
            Integer trangThai,
            Double min,
            Double max,
            List<String> mauSac,
            List<String> chatLieu,
            List<String> loaiSanPham,
            List<String> nhaSanXuat,
            Integer page
    );


    ChiTietSanPham add(ChiTietSanPham chiTietSanPham);

    ChiTietSanPham detail(UUID id);

    void delete(UUID id);

    void deleteMSKC(UUID id);

    void update(Integer soLuong, UUID id);

    List<ChiTietSanPham> getAllProduct();

    List<ChiTietSanPham> getAllBestseller();

    List<ChiTietSanPham> detailByIdSP(UUID id);

    Page<ChiTietSanPham> pageWeb(Integer page);

    ChiTietSanPham findID(UUID id);

    Page<ChiTietSanPham> filter(FilterProductClient filterProductClient, int page);

    Page<ChiTietSanPham> searchMaAndTen(
            String key,
            Integer page
    );
}
